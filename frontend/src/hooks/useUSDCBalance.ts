import { useAccount, useBalance } from 'wagmi';
import { CONTRACTS } from '@/config/contracts';

export function useUSDCBalance() {
  const { address } = useAccount();

  const { data: balance, refetch: refetchBalance } = useBalance({
    address: address as `0x${string}`,
    token: CONTRACTS.USDC.address,
    watch: true,
  });

  return {
    balance: balance?.value ? Number(balance.value) / 1e6 : 0, // USDC has 6 decimals
    formatted: balance?.formatted || '0',
    symbol: 'USDC',
    refetchBalance,
    raw: balance?.value,
  };
}
