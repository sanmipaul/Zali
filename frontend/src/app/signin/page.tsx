'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { getWalletErrorMessage, isUserRejectedError } from '@/utils/walletErrors';
import { trackWalletError } from '@/utils/errorTracking';

export default function SignInPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { connect, connectors, error: wagmiError } = useConnect();
  const { isConnected } = useAccount();
  const { signIn, isLoading, error: authError, clearError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (wagmiError) {
      const errorMessage = getWalletErrorMessage(wagmiError);
      setConnectionError(errorMessage);
      trackWalletError(wagmiError, { context: 'wagmi_connect' });
    }
  }, [wagmiError]);

  useEffect(() => {
    if (authError) {
      setConnectionError(authError);
    }
  }, [authError]);

  useEffect(() => {
    if (isConnected) {
      const handleSignIn = async () => {
        try {
          await signIn();
          router.push('/dashboard');
        } catch (error) {
          if (!isUserRejectedError(error)) {
            const errorMessage = 'Failed to sign in. Please try again.';
            console.error(errorMessage, error);
            trackWalletError(error, { context: 'sign_in' });
            setConnectionError(errorMessage);
          }
        }
      };
      handleSignIn();
    }
  }, [isConnected, signIn, router]);

  const handleConnect = async (connector: any) => {
    if (isConnecting) return;
    
    try {
      setConnectionError(null);
      setIsConnecting(true);
      
      await connect({ 
        connector,
        onError: (error) => {
          if (!isUserRejectedError(error)) {
            const errorMessage = getWalletErrorMessage(error);
            console.error('Wallet connection error:', errorMessage);
            trackWalletError(error, { 
              context: 'wallet_connect',
              connector: connector.name
            });
            setConnectionError(errorMessage);
          }
        }
      });
    } catch (error) {
      if (!isUserRejectedError(error)) {
        const errorMessage = 'An unexpected error occurred. Please try again.';
        console.error(errorMessage, error);
        trackWalletError(error, { 
          context: 'wallet_connect_unexpected',
          connector: connector?.name || 'unknown'
        });
        setConnectionError(errorMessage);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const getConnectorButtonText = (connectorName: string) => {
    const buttonTexts: Record<string, string> = {
      'MetaMask': '🦊 MetaMask',
      'WalletConnect': '🔗 WalletConnect',
      'Coinbase Wallet': '🪙 Coinbase Wallet',
    };
    return buttonTexts[connectorName] || `Connect with ${connectorName}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Connect your wallet to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            {connectionError && (
              <div 
                className="bg-red-50 border-l-4 border-red-400 p-4 mb-4"
                role="alert"
                aria-live="assertive"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{connectionError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {connectors.map((connector) => (
                <motion.button
                  key={connector.uid}
                  onClick={() => handleConnect(connector)}
                  disabled={isLoading || isConnecting}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-busy={isConnecting}
                >
                  {isConnecting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Connecting...
                    </span>
                  ) : (
                    getConnectorButtonText(connector.name)
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
