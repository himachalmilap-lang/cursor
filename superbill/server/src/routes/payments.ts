import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { recordPayment } from '../controllers/paymentController';

const router = Router();
router.use(requireAuth);

router.post('/', recordPayment);

export default router;