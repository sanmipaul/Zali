'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { usePlayerRegistration } from '@/hooks/useContract';
import { trackWalletError } from '@/utils/errorTracking';

type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { address, isConnected, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { isRegistered, playerInfo, error: playerInfoError } = usePlayerRegistration();
  const router = useRouter();

  const updateUserState = useCallback(async () => {
    try {
      setIsLoading(true);
      setAuthError(null);

      if (isConnected && address) {
        // Add a small delay to ensure wallet state is fully updated
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setUser({
          address,
          isRegistered,
          playerInfo,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      const errorMessage = 'Failed to update user authentication state';
      console.error(errorMessage, error);
      trackWalletError(error, { context: 'updateUserState' });
      setAuthError(errorMessage);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected, isRegistered, playerInfo]);

  useEffect(() => {
    updateUserState();
  }, [updateUserState]);

  useEffect(() => {
    if (playerInfoError) {
      console.error('Player info error:', playerInfoError);
      trackWalletError(playerInfoError, { context: 'fetchPlayerInfo' });
    }
  }, [playerInfoError]);

  const signIn = useCallback(async () => {
    try {
      if (!isConnected || !address) {
        throw new Error('Wallet not connected');
      }

      setIsLoading(true);
      setAuthError(null);

      // Here you can add any additional sign-in logic
      // e.g., JWT token generation, user registration, etc.

      await updateUserState();
    } catch (error) {
      const errorMessage = 'Failed to sign in';
      console.error(errorMessage, error);
      trackWalletError(error, { context: 'signIn' });
      setAuthError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected, updateUserState]);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      await disconnect();
      setUser(null);
      router.push('/');
    } catch (error) {
      const errorMessage = 'Failed to sign out';
      console.error(errorMessage, error);
      trackWalletError(error, { context: 'signOut' });
      setAuthError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [disconnect, router]);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error: authError,
        signIn,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
