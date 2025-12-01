'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../../config/web3';
import { AppKitProvider } from '../components/AppKitProvider';
import { ReactNode } from 'react';
import { useMiniPay } from '@/hooks/useMiniPay';
import { WalletErrorBoundary } from '@/components/WalletErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function ProvidersInner({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletErrorBoundary>
          <AppKitProvider>
            {children}
          </AppKitProvider>
        </WalletErrorBoundary>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return <ProvidersInner>{children}</ProvidersInner>;
}
