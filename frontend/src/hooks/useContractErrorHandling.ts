import { useCallback } from 'react';
import { useAccount, useChainId } from 'wagmi';
import {
  ContractError,
  ContractErrorType,
  parseContractError,
  withContractErrorHandling,
  createErrorHandler,
  withRetry
} from '@/utils/contractErrors';
import { CONTRACTS } from '@/config/contracts';
import { Address } from 'viem';
import { getNetwork } from 'viem/actions';

export interface ContractCallOptions<T = any> {
  /**
   * Callback when the operation succeeds
   */
  onSuccess?: (result: T) => void;
  /**
   * Callback when the operation fails
   */
  onError?: (error: ContractError) => void;
  /**
   * Whether to throw errors or return them
   * @default true
   */
  throwErrors?: boolean;
  /**
   * Whether to show error notifications
   * @default true
   */
  showNotifications?: boolean;
  /**
   * Additional context for error messages
   */
  context?: Record<string, any>;
  /**
   * Custom error messages for specific error codes
   */
  errorMessages?: Record<string, string>;
}

/**
 * Hook for contract error handling utilities
 */
export function useContractErrorHandling() {
  const { address } = useAccount();
  const chainId = useChainId();

  // Get current network information
  const getNetworkInfo = useCallback(async () => {
    try {
      const network = await getNetwork();
      return {
        chainId: network.chain?.id,
        chainName: network.chain?.name,
        isTestnet: network.chain?.testnet ?? false
      };
    } catch (error) {
      console.warn('Failed to get network info:', error);
      return { chainId: chainId, chainName: 'Unknown', isTestnet: false };
    }
  }, [chainId]);

  // Helper to create a contract error with enhanced context
  const createContractError = useCallback(async (
    code: ContractErrorType,
    message: string,
    details: Record<string, any> = {},
    originalError?: any
  ): Promise<ContractError> => {
    const networkInfo = await getNetworkInfo();
    const timestamp = new Date().toISOString();

    const enhancedDetails = {
      ...details,
      timestamp,
      network: {
        chainId: networkInfo.chainId,
        chainName: networkInfo.chainName,
        isTestnet: networkInfo.isTestnet,
      },
      // Add wallet info if available
      ...(address && { wallet: { address } }),
      // Add contract info if available
      ...(details.contractName && {
        contract: {
          name: details.contractName,
          address: CONTRACTS[details.contractName as keyof typeof CONTRACTS]?.address
        }
      })
    };

    const error = new Error(message) as ContractError;
    error.code = code;
    error.details = enhancedDetails;

    // Preserve original error information
    if (originalError) {
      error.originalError = originalError;
      // Combine stack traces for better debugging
      error.stack = `${error.stack}\n--- Original Error ---\n${originalError.stack || originalError.message || originalError}`;

      // Add additional error details if available
      if (originalError.code) {
        enhancedDetails.originalErrorCode = originalError.code;
      }
      if (originalError.reason) {
        enhancedDetails.originalReason = originalError.reason;
      }
      if (originalError.method) {
        enhancedDetails.originalMethod = originalError.method;
      }
    }

    return error;
  }, [address, getNetworkInfo]);

  // Create a scoped error handler for a specific context
  const createScopedErrorHandler = useCallback((scope: string) => {
    return createErrorHandler(scope);
  }, []);

  return {
    createContractError,
    createScopedErrorHandler,
    getNetworkInfo,
  };
}