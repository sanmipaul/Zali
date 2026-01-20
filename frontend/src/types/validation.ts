export interface ValidationRule {
  validate: (value: any) => boolean | Promise<boolean>;
  message: string;
}

export interface ValidationRules {
  [fieldName: string]: ValidationRule | ValidationRule[];
}

export interface ValidateOptions {
  abortEarly?: boolean;
  stripUnknown?: boolean;
  async?: boolean;
}

export interface ValidateResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export interface FieldValidator {
  (value: any, fieldName: string): string | null;
}

export interface FormValidator {
  (values: Record<string, any>): Record<string, string>;
}

export enum ValidationStatus {
  IDLE = 'idle',
  VALIDATING = 'validating',
  VALID = 'valid',
  INVALID = 'invalid',
}

export interface ValidationState {
  status: ValidationStatus;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

export interface StringValidationOptions {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  allowEmpty?: boolean;
}

export interface NumberValidationOptions {
  min?: number;
  max?: number;
  integer?: boolean;
}

export interface AddressValidationOptions {
  chainId?: number;
  allowZeroAddress?: boolean;
}

export interface FormValidationRules {
  username?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    required?: boolean;
  };
  email?: {
    required?: boolean;
    pattern?: RegExp;
  };
  password?: {
    minLength?: number;
    maxLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  };
  address?: {
    required?: boolean;
    pattern?: RegExp;
  };
}

export interface SanitizationOptions {
  trimWhitespace?: boolean;
  removeSpecialChars?: boolean;
  toLowerCase?: boolean;
  toUpperCase?: boolean;
  maxLength?: number;
  allowedChars?: string;
}

export interface SanitizationResult {
  original: string;
  sanitized: string;
  changed: boolean;
  removedChars: string[];
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterOptions {
  [key: string]: any;
}

export interface QueryOptions extends PaginationOptions {
  filters?: FilterOptions;
  search?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface CacheOptions {
  ttl?: number;
  key?: string;
  persist?: boolean;
}

export interface RetryOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  shouldRetry?: (error: any) => boolean;
}

export interface TimeoutOptions {
  duration: number;
  onTimeout?: () => void;
}

export interface DebounceOptions {
  wait: number;
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
}

export interface ThrottleOptions {
  wait: number;
  leading?: boolean;
  trailing?: boolean;
}
