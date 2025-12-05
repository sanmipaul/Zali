export enum WalletErrorType {
  // Connection errors
  NO_ETHEREUM_PROVIDER = 'NO_ETHEREUM_PROVIDER',
  USER_REJECTED = 'USER_REJECTED',
  ALREADY_PROCESSING = 'ALREADY_PROCESSING',
  UNSUPPORTED_CHAIN = 'UNSUPPORTED_CHAIN',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
  
  // Account errors
  ACCOUNT_ACCESS_DENIED = 'ACCOUNT_ACCESS_DENIED',
  ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND',
  
  // Transaction errors
  TRANSACTION_REJECTED = 'TRANSACTION_REJECTED',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  GAS_ESTIMATION_FAILED = 'GAS_ESTIMATION_FAILED',
  
  // General errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  PROVIDER_ERROR = 'PROVIDER_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}

interface WalletError {
  type: WalletErrorType;
  message: string;
  originalError?: unknown;
  context?: Record<string, unknown>;
}

const ERROR_MESSAGES: Record<WalletErrorType, string> = {
  [WalletErrorType.NO_ETHEREUM_PROVIDER]: 
    '🔌 No Web3 wallet detected. To get started, please install one of these wallets:\n\n' +
    '• For mobile: Trust Wallet, MetaMask Mobile, or Valora\n' +
    '• For desktop: MetaMask, Coinbase Wallet, or Brave Browser\n\n' +
    'After installing, refresh this page and try connecting again.',
    
  [WalletErrorType.USER_REJECTED]: 
    'Connection was rejected. Please try again and approve the connection in your wallet.',
  [WalletErrorType.ALREADY_PROCESSING]: 
    'A request is already in progress. Please check your wallet and try again.',
  [WalletErrorType.UNSUPPORTED_CHAIN]: 
    '🌐 Unsupported Network. Please switch to one of these networks in your wallet:\n\n' +
    '• Celo Mainnet (Recommended)\n' +
    '• Celo Alfajores (Testnet)\n' +
    '• Celo Baklava (Testnet)\n\n' +
    'Need help? Check our network setup guide in the help section.',
    
  [WalletErrorType.NETWORK_ERROR]: 
    'Network error. Please check your internet connection and try again.',
  [WalletErrorType.TIMEOUT]: 
    'Connection timed out. Please try again.',
  [WalletErrorType.ACCOUNT_ACCESS_DENIED]: 
    'Account access was denied. Please grant the required permissions.',
  [WalletErrorType.ACCOUNT_NOT_FOUND]: 
    'No accounts found. Please unlock your wallet and try again.',
  [WalletErrorType.TRANSACTION_REJECTED]: 
    'Transaction was rejected. Please try again.',
  [WalletErrorType.TRANSACTION_FAILED]: 
    'Transaction failed. Please check your wallet and try again.',
  [WalletErrorType.INSUFFICIENT_FUNDS]: 
    '💸 Oops! You don\'t have enough funds for this transaction.\n\n' +
    '• Current balance: {{balance}} CELO\n' +
    '• Required: {{required}} CELO\n\n' +
    'You can get test tokens from the Celo faucet: https://faucet.celo.org',
    
  [WalletErrorType.GAS_ESTIMATION_FAILED]: 
    '⛽ Failed to estimate gas. This usually happens when:\n' +
    '1. The network is congested\n' +
    '2. The contract is paused\n' +
    '3. There\'s an issue with the transaction parameters\n\n' +
    'Please try again in a few moments or contact support if the issue persists.',
  [WalletErrorType.RATE_LIMIT_EXCEEDED]: 
    'Too many requests. Please wait a moment and try again.',
  [WalletErrorType.PROVIDER_ERROR]: 
    'Wallet provider error. Please try again or contact support if the issue persists.',
  [WalletErrorType.UNKNOWN_ERROR]: 
    '❌ Oops! Something went wrong. Here\'s what you can do:\n\n' +
    '1. Refresh the page and try again\n' +
    '2. Make sure your wallet is connected\n' +
    '3. Check your internet connection\n\n' +
    'Error details: {{error}}',
};

export function createWalletError(
  type: WalletErrorType, 
  originalError?: unknown,
  context: Record<string, unknown> = {}
): WalletError {
  // Format the error message with context variables
  let message = ERROR_MESSAGES[type];
  
  // Replace placeholders with context values
  if (context) {
    Object.entries(context).forEach(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        message = message.replace(`{{${key}}}`, String(value));
      }
    });
  }
  
  // Add a support link for unknown errors
  if (type === WalletErrorType.UNKNOWN_ERROR) {
    message += '\n\nNeed help? Contact support at support@example.com';
  }
  
  return {
    type,
    message,
    originalError,
    context: {
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      ...context
    }
  };
}

export function getWalletError(error: unknown): WalletError {
  if (isWalletError(error)) {
    return error;
  }

  const errorMessage = (error as Error)?.message?.toLowerCase() || String(error).toLowerCase();
  const errorCode = (error as any)?.code;
  const context: Record<string, unknown> = { originalError: error };

  // Extract balance information if available
  if (errorMessage.includes('insufficient funds')) {
    const balanceMatch = errorMessage.match(/balance=([0-9.]+)/);
    const requiredMatch = errorMessage.match(/required=([0-9.]+)/);
    
    if (balanceMatch && requiredMatch) {
      context.balance = balanceMatch[1];
      context.required = requiredMatch[1];
    }
    
    return createWalletError(
      WalletErrorType.INSUFFICIENT_FUNDS, 
      error,
      context
    );
  }

  // Handle specific error codes and messages
  switch (errorCode) {
    case 4001:
      return createWalletError(WalletErrorType.USER_REJECTED, error, { action: 'connection' });
    case -32002:
      return createWalletError(WalletErrorType.ALREADY_PROCESSING, error);
    case 4902:
      return createWalletError(WalletErrorType.UNSUPPORTED_CHAIN, error, { 
        supportedChains: ['Celo Mainnet', 'Celo Alfajores', 'Celo Baklava'] 
      });
    case 'UNSUPPORTED_OPERATION':
      return createWalletError(WalletErrorType.PROVIDER_ERROR, error, { 
        message: 'This operation is not supported by your wallet' 
      });
    case 'ACTION_REJECTED':
      return createWalletError(WalletErrorType.TRANSACTION_REJECTED, error, {
        action: 'transaction',
        suggestion: 'Please check your wallet and try again.'
      });
    default:
      if (errorMessage.includes('user rejected') || errorMessage.includes('user denied')) {
        return createWalletError(WalletErrorType.USER_REJECTED, error, { action: 'connection' });
      }
      if (errorMessage.includes('already processing') || errorMessage.includes('already pending')) {
        return createWalletError(WalletErrorType.ALREADY_PROCESSING, error);
      }
      if (errorMessage.includes('network error') || errorMessage.includes('network changed')) {
        return createWalletError(WalletErrorType.NETWORK_ERROR, error);
      }
      if (errorMessage.includes('transaction failed') || errorMessage.includes('execution reverted')) {
        return createWalletError(WalletErrorType.TRANSACTION_FAILED, error, {
          txHash: (error as any)?.transactionHash,
          suggestion: 'The transaction was sent but failed on the blockchain.'
        });
      }
      if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
        return createWalletError(WalletErrorType.TIMEOUT, error);
      }
      if (errorMessage.includes('insufficient funds') || errorMessage.includes('not enough funds')) {
        return createWalletError(WalletErrorType.INSUFFICIENT_FUNDS, error, {
          balance: '0',
          required: '0.1' // Default value, will be overridden if extracted from error
        });
      }
      
      // Add error details to context for unknown errors
      context.errorCode = errorCode;
      context.rawMessage = (error as Error)?.message || String(error);
      
      return createWalletError(WalletErrorType.UNKNOWN_ERROR, error, context);
  }
}

export function getWalletErrorMessage(error: unknown): string {
  try {
    const walletError = getWalletError(error);
    
    // Format the message with line breaks for better readability
    return walletError.message
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
  } catch (e) {
    console.error('Error formatting wallet error message:', e);
    return 'An unexpected error occurred. Please try again or contact support.';
  }
}

export function isUserRejectedError(error: unknown): boolean {
  try {
    const walletError = getWalletError(error);
    return walletError.type === WalletErrorType.USER_REJECTED;
  } catch (e) {
    return false;
  }
}

export function isWalletError(error: unknown): error is WalletError {
  try {
    const e = error as WalletError;
    return (
      e !== null &&
      typeof e === 'object' &&
      'type' in e &&
      'message' in e &&
      Object.values(WalletErrorType).includes(e.type as WalletErrorType)
    );
  } catch (e) {
    return false;
  }
}

export function isRecoverableError(error: unknown): boolean {
  if (!error) return false;
  
  try {
    const walletError = getWalletError(error);
    
    // List of error types that are considered recoverable
    const recoverableErrors = [
      WalletErrorType.ALREADY_PROCESSING,
      WalletErrorType.NETWORK_ERROR,
      WalletErrorType.TIMEOUT,
      WalletErrorType.RATE_LIMIT_EXCEEDED,
    ];
    
    return recoverableErrors.includes(walletError.type);
  } catch (e) {
    // If we can't determine the error type, assume it's not recoverable
    return false;
  }
}
