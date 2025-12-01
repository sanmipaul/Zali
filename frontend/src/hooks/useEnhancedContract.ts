import { useCallback, useMemo } from 'react';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { parseContractError, withContractErrorHandling } from '@/utils/contractErrors';
import { CONTRACTS } from '@/config/contracts';
import { Address, encodeFunctionData } from 'viem';

interface ContractCallOptions {
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
  context?: string;
}

export function useEnhancedContract() {
  const { address } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  // Check if the current chain is supported
  const isSupportedChain = useMemo(() => {
    return chainId === CONTRACTS.chainId;
  }, [chainId]);

  // Get contract ABI and address
  const getContractInfo = useCallback((contractName: keyof typeof CONTRACTS) => {
    const contract = CONTRACTS[contractName];
    if (!contract) {
      throw new Error(`Contract ${contractName} not found in config`);
    }
    return {
      address: contract.address as Address,
      abi: contract.abi,
    };
  }, []);

  // Read from contract with enhanced error handling
  const readContract = useCallback(async <T = any>(
    contractName: keyof typeof CONTRACTS,
    functionName: string,
    args: any[] = [],
    options: ContractCallOptions = {}
  ): Promise<T> => {
    return withContractErrorHandling(async () => {
      if (!address) {
        throw new Error('Wallet not connected');
      }

      if (!isSupportedChain) {
        throw new Error('Unsupported network');
      }

      const { address: contractAddress, abi } = getContractInfo(contractName);
      
      try {
        const result = await publicClient.readContract({
          address: contractAddress,
          abi,
          functionName,
          args,
        });

        options.onSuccess?.(result);
        return result as T;
      } catch (error: any) {
        const parsedError = parseContractError(error);
        const enhancedError = new Error(parsedError.message);
        Object.assign(enhancedError, { code: parsedError.code, originalError: error });
        
        options.onError?.(enhancedError);
        throw enhancedError;
      }
    }, `Reading ${functionName} from ${contractName}`);
  }, [address, isSupportedChain, publicClient, getContractInfo]);

  // Write to contract with enhanced error handling
  const writeContract = useCallback(async (
    contractName: keyof typeof CONTRACTS,
    functionName: string,
    args: any[] = [],
    value: bigint = 0n,
    options: ContractCallOptions = {}
  ): Promise<`0x${string}`> => {
    return withContractErrorHandling(async () => {
      if (!address) {
        throw new Error('Wallet not connected');
      }

      if (!walletClient) {
        throw new Error('Wallet client not available');
      }

      if (!isSupportedChain) {
        throw new Error('Unsupported network');
      }

      const { address: contractAddress, abi } = getContractInfo(contractName);
      
      try {
        const { request } = await publicClient.simulateContract({
          account: address,
          address: contractAddress,
          abi,
          functionName,
          args,
          value,
        });

        const hash = await walletClient.writeContract({
          ...request,
          account: address,
        });

        const receipt = await publicClient.waitForTransactionReceipt({
          hash,
          confirmations: 1,
          timeout: 60_000, // 1 minute timeout
        });

        if (receipt.status === 'success') {
          options.onSuccess?.(receipt);
          return hash;
        } else {
          throw new Error('Transaction failed');
        }
      } catch (error: any) {
        const parsedError = parseContractError(error);
        const enhancedError = new Error(parsedError.message);
        Object.assign(enhancedError, { code: parsedError.code, originalError: error });
        
        options.onError?.(enhancedError);
        throw enhancedError;
      }
    }, `Writing ${functionName} to ${contractName}`);
  }, [address, walletClient, isSupportedChain, publicClient, getContractInfo]);

  // Create a contract instance with typed methods
  const createContract = useCallback((contractName: keyof typeof CONTRACTS) => {
    return {
      read: async <T = any>(
        functionName: string,
        args: any[] = [],
        options: ContractCallOptions = {}
      ) => readContract<T>(contractName, functionName, args, options),
      
      write: async (
        functionName: string,
        args: any[] = [],
        value: bigint = 0n,
        options: ContractCallOptions = {}
      ) => writeContract(contractName, functionName, args, value, options),
      
      // Add any additional contract-specific methods here
      // For example, for ERC20 tokens:
      // balanceOf: (account: string) => readContract(contractName, 'balanceOf', [account]),
      // transfer: (to: string, amount: bigint) => writeContract(contractName, 'transfer', [to, amount]),
    };
  }, [readContract, writeContract]);

  return {
    readContract,
    writeContract,
    createContract,
    isSupportedChain,
    address,
    chainId,
  };
}

// Example usage:
/*
const { createContract } = useEnhancedContract();
const triviaGame = createContract('triviaGameV2');

// Read from contract
try {
  const playerInfo = await triviaGame.read('getPlayerInfo', [address]);
  console.log('Player info:', playerInfo);
} catch (error) {
  console.error('Failed to get player info:', error);
}

// Write to contract
try {
  const txHash = await triviaGame.write('registerUsername', ['myUsername']);
  console.log('Transaction hash:', txHash);
} catch (error) {
  console.error('Failed to register username:', error);
  // Handle specific error types
  if (error.code === 'ALREADY_REGISTERED') {
    // Show user-friendly message
  }
}
*/
