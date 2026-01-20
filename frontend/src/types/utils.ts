import { ApiException, ErrorCode, ERROR_MESSAGES } from './errors';
import {
  isApiSuccessResponse,
  isApiErrorResponse,
  isApiException,
  isPlayerInfo,
  isGameSession,
  isLeaderboardEntry,
  isUser,
  isUserProfile,
  isUserStatistics,
  isReward,
  isGameReward,
  isRewardBalance,
  isErrorCode,
  isValidBigInt,
  isValidAddress,
  isValidUsername,
  isValidEmail,
} from './guards';

export const TypeUtils = {
  guards: {
    isApiSuccessResponse,
    isApiErrorResponse,
    isApiException,
    isPlayerInfo,
    isGameSession,
    isLeaderboardEntry,
    isUser,
    isUserProfile,
    isUserStatistics,
    isReward,
    isGameReward,
    isRewardBalance,
    isErrorCode,
    isValidBigInt,
    isValidAddress,
    isValidUsername,
    isValidEmail,
  },

  errors: {
    createApiException: (
      code: string | ErrorCode,
      message?: string,
      statusCode: number = 500,
      details?: Record<string, any>
    ): ApiException => {
      return new ApiException(
        code,
        message || ERROR_MESSAGES[code] || 'An error occurred',
        statusCode,
        details
      );
    },

    getErrorMessage: (code: string | ErrorCode): string => {
      return ERROR_MESSAGES[code] || 'An unexpected error occurred';
    },

    isClientError: (statusCode: number): boolean => {
      return statusCode >= 400 && statusCode < 500;
    },

    isServerError: (statusCode: number): boolean => {
      return statusCode >= 500 && statusCode < 600;
    },
  },

  conversion: {
    bigintToNumber: (value: bigint | undefined): number => {
      return value ? Number(value) : 0;
    },

    bigintToString: (value: bigint | undefined): string => {
      return value ? value.toString() : '0';
    },

    numberToBigint: (value: number): bigint => {
      return BigInt(Math.floor(value));
    },

    stringToBigint: (value: string): bigint | null => {
      try {
        return BigInt(value);
      } catch {
        return null;
      }
    },

    weiToCelo: (wei: bigint): number => {
      return Number(wei) / 1e18;
    },

    celoToWei: (celo: number): bigint => {
      return BigInt(Math.floor(celo * 1e18));
    },
  },

  validation: {
    validateUsername: (username: string): { valid: boolean; error?: string } => {
      if (!username || typeof username !== 'string') {
        return { valid: false, error: 'Username must be a string' };
      }
      if (username.length < 3) {
        return { valid: false, error: 'Username must be at least 3 characters' };
      }
      if (username.length > 20) {
        return { valid: false, error: 'Username must be at most 20 characters' };
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return { valid: false, error: 'Username can only contain letters, numbers, and underscores' };
      }
      return { valid: true };
    },

    validateAddress: (address: string): { valid: boolean; error?: string } => {
      if (!address || typeof address !== 'string') {
        return { valid: false, error: 'Address must be a string' };
      }
      if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        return { valid: false, error: 'Invalid Ethereum address format' };
      }
      return { valid: true };
    },

    validateEmail: (email: string): { valid: boolean; error?: string } => {
      if (!email || typeof email !== 'string') {
        return { valid: false, error: 'Email must be a string' };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { valid: false, error: 'Invalid email format' };
      }
      return { valid: true };
    },

    validatePassword: (password: string): { valid: boolean; error?: string } => {
      if (!password || typeof password !== 'string') {
        return { valid: false, error: 'Password must be a string' };
      }
      if (password.length < 8) {
        return { valid: false, error: 'Password must be at least 8 characters' };
      }
      if (!/[A-Z]/.test(password)) {
        return { valid: false, error: 'Password must contain at least one uppercase letter' };
      }
      if (!/[a-z]/.test(password)) {
        return { valid: false, error: 'Password must contain at least one lowercase letter' };
      }
      if (!/[0-9]/.test(password)) {
        return { valid: false, error: 'Password must contain at least one number' };
      }
      return { valid: true };
    },
  },

  formatting: {
    formatAddress: (address: string): string => {
      if (!address) return '';
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    },

    formatScore: (score: bigint | number): string => {
      const num = typeof score === 'bigint' ? Number(score) : score;
      return num.toLocaleString();
    },

    formatPercentage: (value: number, decimals: number = 1): string => {
      return `${value.toFixed(decimals)}%`;
    },

    formatCurrency: (amount: number, symbol: string = 'CELO'): string => {
      return `${amount.toFixed(2)} ${symbol}`;
    },

    formatDate: (date: string | Date): string => {
      const d = typeof date === 'string' ? new Date(date) : date;
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },

    formatDateTime: (date: string | Date): string => {
      const d = typeof date === 'string' ? new Date(date) : date;
      return d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
};

export type { ApiException, ErrorCode };
export { ERROR_MESSAGES };
