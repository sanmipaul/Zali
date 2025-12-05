import { z } from 'zod';

export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be less than 20 characters')
  .regex(
    /^[a-zA-Z0-9_]+$/,
    'Username can only contain letters, numbers, and underscores'
  )
  .transform((val) => val.trim());

export const registrationSchema = z.object({
  username: usernameSchema,
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Validation error messages
export const validationMessages = {
  username: {
    required: 'Username is required',
    min: 'Username must be at least 3 characters',
    max: 'Username must be less than 20 characters',
    invalid: 'Username can only contain letters, numbers, and underscores',
  },
};
