import { Router } from 'express';
import healthRouter from './health.routes.js';

const router = Router();

// Mount system routes
router.use('/', healthRouter);

export default router;
