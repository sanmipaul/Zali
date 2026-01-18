import { useReadContract, useBalance } from 'wagmi';
import { CONTRACTS } from '@/config/contracts';
import { useState, useEffect } from 'react';

// Type for loading states
export interface LoadingState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Hook for faucet queries
 */
export function useFaucetQueries() {
  const [faucetState, setFaucetState] = useState<LoadingState>({
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: null,
  });

  // Check claim amount
  const {
    data: claimAmount,
    isFetching: isFetchingClaimAmount,
    isError: isClaimAmountError,
    error: claimAmountError,
    refetch: refetchClaimAmount
  } = useReadContract({
    address: CONTRACTS.faucet?.address,
    abi: CONTRACTS.faucet?.abi,
    functionName: 'claimAmount',
  });

  // Check contract balance
  const {
    data: contractBalance,
    isFetching: isFetchingContractBalance,
    isError: isContractBalanceError,
    error: contractBalanceError,
    refetch: refetchContractBalance
  } = useBalance({
    address: CONTRACTS.faucet?.address as `0x${string}`,
    token: CONTRACTS.USDC?.address as `0x${string}`,
  });

  // Update faucet state based on data fetching status
  useEffect(() => {
    setFaucetState(prev => ({
      ...prev,
      isLoading: isFetchingClaimAmount || isFetchingContractBalance,
      isError: isClaimAmountError || isContractBalanceError,
      error: claimAmountError || contractBalanceError || null,
    }));
  }, [
    isFetchingClaimAmount,
    isFetchingContractBalance,
    isClaimAmountError,
    isContractBalanceError,
    claimAmountError,
    contractBalanceError
  ]);

  return {
    claimAmount: {
      data: claimAmount,
      isLoading: isFetchingClaimAmount,
      error: isClaimAmountError ? claimAmountError : null,
      refetch: refetchClaimAmount
    },
    contractBalance: {
      data: contractBalance?.value,
      isLoading: isFetchingContractBalance,
      error: isContractBalanceError ? contractBalanceError : null,
      refetch: refetchContractBalance
    },
    faucetState,
  };
}