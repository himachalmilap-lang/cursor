import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { salesByMonth, taxSummary } from '../controllers/reportController';

const router = Router();
router.use(requireAuth);

router.get('/sales-by-month', salesByMonth);
router.get('/tax-summary', taxSummary);

export default router;