import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const baseSchema = {
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  SECRET_KEY: z.string(),
};

const envSchema = z.object({
  ...baseSchema,
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
  PORT: z.coerce.number().default(3333),
});

export const env = envSchema.parse(process.env);
