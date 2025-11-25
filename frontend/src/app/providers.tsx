'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../../config/web3';
import { AppKitProvider } from '../components/AppKitProvider';
import { ReactNode } from 'react';
import { useMiniPay } from '@/hooks/useMiniPay';

const queryClient = new QueryClient();

function ProvidersInner({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider>
          {children}
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return <ProvidersInner>{children}</ProvidersInner>;
}
