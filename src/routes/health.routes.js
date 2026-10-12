import { Router } from 'express';

const router = Router();

/**
 * GET /api/health
 * Returns HTTP 200 indicating that the backend process is healthy and running.
 * Note: Per Section 5 of PRODUCT_SPEC Phase 1B, this verifies HTTP server readiness
 * and does NOT imply or require active database connections or Supabase credentials.
 */
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'lautech-life-backend',
    version: '0.1.0',
    phase: '1B',
    timestamp: new Date().toISOString(),
  });
});

export default router;
