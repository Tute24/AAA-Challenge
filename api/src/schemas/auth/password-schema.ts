import z from 'zod';

export const passwordSchema = z
  .string()
  .min(8, {
    message:
      'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.',
  })
  .regex(/[A-Z]/, {
    message: 'Password must include at least one uppercase letter.',
  })
  .regex(/[0-9]/, {
    message: 'Password must include at least one number.',
  })
  .regex(/[^A-Za-z0-9]/, {
    message: 'Password must include at least one special character.',
  });
