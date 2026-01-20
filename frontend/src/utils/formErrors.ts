import { z } from 'zod';
import { WalletErrorType } from './walletErrors';

export enum FormErrorType {
  // Validation errors
  REQUIRED = 'REQUIRED',
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT',
  PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
  INVALID_USERNAME = 'INVALID_USERNAME',
  INVALID_AMOUNT = 'INVALID_AMOUNT',
  INVALID_ADDRESS = 'INVALID_ADDRESS',
  
  // Business logic errors
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  
  // System errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface FormError {
  type: FormErrorType | WalletErrorType;
  message: string;
  field?: string;
  code?: string | number;
  details?: Record<string, unknown>;
}

const ERROR_MESSAGES: Record<FormErrorType, string> = {
  // Validation errors
  [FormErrorType.REQUIRED]: 'This field is required',
  [FormErrorType.INVALID_EMAIL]: 'Please enter a valid email address',
  [FormErrorType.INVALID_PASSWORD]: 'Password must be at least 8 characters long and contain a number',
  [FormErrorType.PASSWORD_TOO_SHORT]: 'Password must be at least 8 characters',
  [FormErrorType.PASSWORD_MISMATCH]: 'Passwords do not match',
  [FormErrorType.INVALID_USERNAME]: 'Username can only contain letters, numbers, and underscores',
  [FormErrorType.INVALID_AMOUNT]: 'Please enter a valid amount',
  [FormErrorType.INVALID_ADDRESS]: 'Please enter a valid wallet address',
  
  // Business logic errors
  [FormErrorType.INSUFFICIENT_BALANCE]: 'Insufficient balance',
  [FormErrorType.DUPLICATE_ENTRY]: 'This value already exists',
  [FormErrorType.NOT_FOUND]: 'The requested resource was not found',
  [FormErrorType.UNAUTHORIZED]: 'You are not authorized to perform this action',
  
  // System errors
  [FormErrorType.NETWORK_ERROR]: 'Network error. Please check your connection and try again.',
  [FormErrorType.TIMEOUT]: 'Request timed out. Please try again.',
  [FormErrorType.UNKNOWN_ERROR]: 'An unexpected error occurred',
};

export function createFormError(
  type: FormErrorType | WalletErrorType,
  options: {
    field?: string;
    code?: string | number;
    details?: Record<string, unknown>;
    message?: string;
  } = {}
): FormError {
  return {
    type,
    message: options.message || ERROR_MESSAGES[type as FormErrorType] || 'An error occurred',
    field: options.field,
    code: options.code,
    details: options.details,
  };
}

export function isFormError(error: unknown): error is FormError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error
  );
}

export function getFormErrorMessage(error: unknown, field?: string): string {
  if (!error) return '';
  
  if (isFormError(error)) {
    // Only return the error message if it's for the specified field or no field is specified
    if (!field || error.field === field) {
      return error.message;
    }
    return '';
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
}

export function getFormFieldError(errors: FormError[], field: string): string {
  const error = errors.find(err => err.field === field);
  return error ? error.message : '';
}

// Common validation schemas
export const validationSchemas = {
  email: z.string().email({ message: ERROR_MESSAGES[FormErrorType.INVALID_EMAIL] }),
  password: z
    .string()
    .min(8, { message: ERROR_MESSAGES[FormErrorType.PASSWORD_TOO_SHORT] })
    .regex(/[0-9]/, { message: ERROR_MESSAGES[FormErrorType.INVALID_PASSWORD] }),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, { 
      message: ERROR_MESSAGES[FormErrorType.INVALID_USERNAME] 
    }),
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
    message: ERROR_MESSAGES[FormErrorType.INVALID_ADDRESS],
  }),
  amount: z.number().positive({
    message: ERROR_MESSAGES[FormErrorType.INVALID_AMOUNT],
  }),
};

// Helper function to validate form fields
export async function validateFormField<T>(
  schema: z.ZodType<T>,
  value: unknown,
  field: string
): Promise<{ success: boolean; error?: FormError }> {
  try {
    await schema.parseAsync(value);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: createFormError(FormErrorType.INVALID_EMAIL, {
          field,
          message: error.errors[0]?.message || 'Invalid field',
        }),
      };
    }
    return {
      success: false,
      error: createFormError(FormErrorType.UNKNOWN_ERROR, {
        field,
        message: 'Validation failed',
      }),
    };
  }
}

// Helper function to handle form submission errors
export function handleFormError(
  error: unknown,
  setFieldError: (field: string, message: string) => void
): void {
  if (isFormError(error)) {
    if (error.field) {
      setFieldError(error.field, error.message);
    }
  } else if (error instanceof Error) {
    console.error('Form submission error:', error);
  }
  
  // You might want to log the error to an error tracking service here
  // logErrorToService(error);
}
