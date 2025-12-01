export enum WalletErrorType {
  NO_ETHEREUM_PROVIDER = 'NO_ETHEREUM_PROVIDER',
  USER_REJECTED = 'USER_REJECTED',
  ALREADY_PROCESSING = 'ALREADY_PROCESSING',
  UNSUPPORTED_CHAIN = 'UNSUPPORTED_CHAIN',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export function getWalletErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const err = error as { code?: number | string; message?: string };
    
    if (err.code === 4001) {
      return 'Connection rejected. Please try again.';
    }
    
    if (err.message?.includes('User rejected')) {
      return 'Connection rejected. Please try again.';
    }
    
    if (err.message?.includes('already processing')) {
      return 'Connection in progress. Please check your wallet.';
    }
    
    if (err.message?.includes('No Ethereum provider was found')) {
      return 'No Ethereum wallet found. Please install MetaMask or another wallet.';
    }
    
    return err.message || 'Failed to connect wallet. Please try again.';
  }
  
  return 'An unknown error occurred. Please try again.';
}

export function isUserRejectedError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null) {
    const err = error as { code?: number | string; message?: string };
    return (
      err.code === 4001 || 
      err.message?.includes('User rejected') ||
      err.message?.includes('User denied')
    );
  }
  return false;
}
