import { StateCreator } from 'zustand';
import { useAccount, useDisconnect } from 'wagmi';
import { usePlayerRegistration } from '@/hooks/useContract';

export interface User {
  address: string;
  username?: string;
  avatar?: string;
  isRegistered: boolean;
  lastLogin?: string;
}

export interface AuthSlice {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  AuthSlice
> = (set, get) => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { isRegistered, playerInfo } = usePlayerRegistration();

  return {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    setUser: (user) => set({ user, isAuthenticated: !!user }, false, 'auth/setUser'),
    setLoading: (isLoading) => set({ isLoading }, false, 'auth/setLoading'),
    setError: (error) => set({ error }, false, 'auth/setError'),

    logout: async () => {
      try {
        set({ isLoading: true }, false, 'auth/logout/pending');
        await disconnect();
        set({ user: null, isAuthenticated: false }, false, 'auth/logout/fulfilled');
      } catch (error) {
        set({ error: 'Failed to logout' }, false, 'auth/logout/rejected');
        throw error;
      } finally {
        set({ isLoading: false }, false, 'auth/logout/finally');
      }
    },

    checkAuth: async () => {
      try {
        set({ isLoading: true }, false, 'auth/checkAuth/pending');
        
        if (!address) {
          set({ user: null, isAuthenticated: false }, false, 'auth/checkAuth/noAddress');
          return;
        }

        const user: User = {
          address,
          isRegistered,
          ...(playerInfo && { 
            username: playerInfo.username,
            avatar: playerInfo.avatar,
            lastLogin: new Date().toISOString()
          })
        };

        set({ 
          user, 
          isAuthenticated: true,
          error: null 
        }, false, 'auth/checkAuth/fulfilled');
      } catch (error) {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: 'Failed to check authentication' 
        }, false, 'auth/checkAuth/rejected');
        throw error;
      } finally {
        set({ isLoading: false }, false, 'auth/checkAuth/finally');
      }
    },
  };
};