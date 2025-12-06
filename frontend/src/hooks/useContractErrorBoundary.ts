import { useCallback } from 'react';
import { ContractError, ContractErrorType, parseContractError as parseContractErrorUtil } from '@/utils/contractErrors';

type ParseContractError = (error: any, context?: Record<string, any>) => { 
  message: string; 
  code: ContractErrorType; 
  details?: Record<string, any> 
};

// Use the imported function with a type assertion
const parseContractError = parseContractErrorUtil as unknown as ParseContractError;

type ErrorHandler = (error: Error, errorInfo?: any) => void;

interface UseContractErrorBoundaryOptions {
  /**
   * The context in which the error occurred (e.g., 'claimRewards', 'submitAnswer')
   * This helps with debugging and error tracking.
   */
  context: string;
  
  /**
   * Additional context data to include with the error
   */
  metadata?: Record<string, any>;
  
  /**
   * Whether to log errors to the console
   * @default true
   */
  logToConsole?: boolean;
  
  /**
   * Whether to capture errors in Sentry
   * @default true in production
   */
  captureInSentry?: boolean;
}

/**
 * Hook that provides utilities for handling contract errors with error boundaries
 */
export function useContractErrorBoundary({
  context,
  metadata = {},
  logToConsole = true,
  captureInSentry = process.env.NODE_ENV === 'production',
}: UseContractErrorBoundaryOptions) {
  /**
   * Handles errors from contract interactions
   */
  const handleContractError = useCallback<ErrorHandler>(async (error, errorInfo) => {
    // Create a standardized contract error if it isn't already one
    let contractError: ContractError;
    
    if (error && 'code' in error && 'details' in error) {
      contractError = error as ContractError;
    } else {
      const { message, code, details } = parseContractError(error || new Error('Unknown error'), { context, ...metadata });
      contractError = new Error(message) as ContractError;
      (contractError as any).code = code;
      (contractError as any).details = { ...details, context, ...metadata };
      contractError.name = 'ContractError';
    }
    
    // Log to console if enabled
    if (logToConsole) {
      console.error(`[Contract Error] ${context}:`, contractError, errorInfo);
    }
    
    // Log to console if enabled
    if (logToConsole) {
      console.error(`[Contract Error] ${context}:`, contractError, errorInfo);
    }
    
    // In a real app, you would integrate with your error tracking service here
    // For example, with Sentry:
    // if (captureInSentry && typeof window !== 'undefined' && (window as any).Sentry) {
    //   try {
    //     (window as any).Sentry.captureException(contractError, {
    //       tags: { 
    //         type: 'contract_error',
    //         error_code: (contractError as any).code,
    //         context,
    //       },
    //       extra: {
    //         ...(contractError as any).details,
    //         originalError: error instanceof Error ? {
    //           name: error.name,
    //           message: error.message,
    //           stack: error.stack,
    //         } : error,
    //         errorInfo,
    //       },
    //     });
    //   } catch (sentryError) {
    //     console.error('Failed to capture error in Sentry:', sentryError);
    //   }
    // }
    }
    
    // Re-throw the error so it can be caught by error boundaries
    throw contractError;
  }, [context, metadata, logToConsole, captureInSentry]);
  
  /**
   * Wraps an async function with error handling
   */
  const withErrorHandling = useCallback(<T extends (...args: any[]) => Promise<any>>(
    fn: T
  ): ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>) => {
    return async (...args: Parameters<T>) => {
      try {
        return await fn(...args);
      } catch (error) {
        await handleContractError(error as Error, { args });
        throw error; // Re-throw to allow error boundaries to catch it
      }
    };
  }, [handleContractError]);
  
  /**
   * Creates a handler for UI components
   */
  const createHandler = useCallback((handler: (...args: any[]) => any) => {
    return (...args: any[]) => {
      try {
        return handler(...args);
      } catch (error) {
        handleContractError(error as Error, { args });
        throw error; // Re-throw to allow error boundaries to catch it
      }
    };
  }, [handleContractError]);
  
  return {
    /**
     * Handles an error from a contract interaction
     */
    handleError: handleContractError,
    
    /**
     * Wraps an async function with error handling
     */
    withErrorHandling,
    
    /**
     * Creates a handler for UI components
     */
    createHandler,
    
    /**
     * Error boundary props to be spread onto a ContractErrorBoundary
     */
    errorBoundaryProps: {
      onError: handleContractError,
      context: { ...metadata, context },
    },
  };
}
