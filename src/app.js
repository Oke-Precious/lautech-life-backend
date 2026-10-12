import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import apiRouter from './routes/index.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

/**
 * LAUTECH Life Backend Express Application
 * 
 * Phase 1B Core:
 * - Allowed frontend origin from environment configuration
 * - Controlled CORS policy
 * - JSON request size limits (100kb)
 * - Safe centralized error handling & unknown route handling
 * - No sensitive information or stack traces in public production responses
 */

const app = express();

// Security: Disable express fingerprinting header
app.disable('x-powered-by');

// Security: Controlled CORS policy with configurable frontend origin
app.use(cors({
  origin: env.FRONTEND_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Security: Request size bounds to mitigate memory exhaustion
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

// Mount API routes under /api
app.use('/api', apiRouter);

// Safe fallback for unmatched routes
app.use(notFoundHandler);

// Centralized error handling
app.use(errorHandler);

export default app;
