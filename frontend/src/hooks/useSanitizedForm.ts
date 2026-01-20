import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { sanitizeString, sanitizeNumber } from '@/utils/sanitize';

/**
 * A custom hook that extends react-hook-form with automatic input sanitization
 * @template T - The form data type
 * @param {ZodType<T>} schema - The Zod validation schema
 * @param {Object} options - react-hook-form options
 * @returns {UseFormReturn<T>} The form methods with sanitization
 */
export const useSanitizedForm = <T extends FieldValues>(
  schema: ZodType<T>,
  options?: Parameters<typeof useForm<T>>[0]
): UseFormReturn<T> => {
  const form = useForm<T>({
    ...options,
    resolver: zodResolver(schema),
  });

  // Add custom sanitization to form values
  const originalHandleSubmit = form.handleSubmit;
  
  form.handleSubmit = (onValid, onInvalid) => {
    return originalHandleSubmit((data, event) => {
      // Recursively sanitize all string values in the form data
      const sanitizeValue = (value: any): any => {
        if (typeof value === 'string') {
          return sanitizeString(value);
        }
        if (typeof value === 'number') {
          return sanitizeNumber(value);
        }
        if (Array.isArray(value)) {
          return value.map(sanitizeValue);
        }
        if (value && typeof value === 'object') {
          return Object.fromEntries(
            Object.entries(value).map(([key, val]) => [key, sanitizeValue(val)])
          );
        }
        return value;
      };

      const sanitizedData = sanitizeValue(data) as T;
      return onValid(sanitizedData, event);
    }, onInvalid);
  };

  return form;
};
