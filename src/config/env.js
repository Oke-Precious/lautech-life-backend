import 'dotenv/config';

/**
 * Environment configuration for LAUTECH Life Backend.
 * Reads environment variables with safe Phase 1 defaults.
 * Supabase variables are documented for future phases and are NOT required in Phase 1.
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '4000', 10),
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',

  // Documented future variables for Supabase PostgreSQL and Supabase Auth (Phase 2+)
  SUPABASE_URL: process.env.SUPABASE_URL || null,
  SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY || null,
  DATABASE_URL: process.env.DATABASE_URL || null,
  DATABASE_POOL_MAX: parseInt(process.env.DATABASE_POOL_MAX || '5', 10),
};
