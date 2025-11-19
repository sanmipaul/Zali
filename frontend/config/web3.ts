import { http, createConfig } from 'wagmi';
import { celoAlfajores, celo } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// MiniPay-optimized configuration using wagmi v2
export const config = getDefaultConfig({
  appName: 'Celo Knowledge Quest',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [celoAlfajores, celo],
  transports: {
    [celoAlfajores.id]: http(),
    [celo.id]: http(),
  },
});

// Helper to prepare transaction with feeCurrency for MiniPay
export function prepareMiniPayTransaction(tx: any) {
  return {
    ...tx,
    // MiniPay requires feeCurrency for cUSD gas payments
    feeCurrency: '0x765DE816845861e75A25fCA122bb6898B8B1282a', // cUSD address
    // Use legacy transaction type (not EIP-1559)
    type: 'legacy' as const,
  };
}
