import z from 'zod';

export const passwordSchema = z
  .string()
  .min(8, {
    message:
      'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.',
  })
  .regex(/[A-Z]/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula.',
  })
  .regex(/[0-9]/, {
    message: 'A senha deve conter pelo menos um número.',
  })
  .regex(/[^A-Za-z0-9]/, {
    message: 'A senha deve conter pelo menos um caractere especial.',
  });
