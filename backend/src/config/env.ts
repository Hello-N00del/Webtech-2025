import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('24h'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),
  PORT: z.string().transform(Number).default('3000'),
  BASE_URL: z.string().url().default('http://localhost:3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  EMAIL_FROM: z.string().email(),
  UPLOAD_DIR: z.string().default('public/uploads'),
  MAX_FILE_SIZE: z.string().transform(Number).default('5242880'),
});

export const env = envSchema.parse(process.env);
