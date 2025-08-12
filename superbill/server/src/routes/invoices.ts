import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { listInvoices, createInvoice, getInvoice, updateInvoice, deleteInvoice, pdfInvoice, xmlInvoice } from '../controllers/invoiceController';

const router = Router();
router.use(requireAuth);

router.get('/', listInvoices);
router.post('/', createInvoice);
router.get('/:id', getInvoice);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);
router.get('/:id/pdf', pdfInvoice);
router.get('/:id/xml', xmlInvoice);

export default router;