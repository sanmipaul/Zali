'use client';

import { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface WalletErrorBoundaryProps {
  children: ReactNode;
}

export function WalletErrorBoundary({ children }: WalletErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded">
          <p className="font-bold">Wallet Connection Error</p>
          <p className="text-sm mt-1">
            We couldn't connect to your wallet. Please try again or use a different wallet.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
          >
            Reload Page
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export default WalletErrorBoundary;
