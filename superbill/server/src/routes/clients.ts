import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { listClients, createClient, getClient, updateClient, deleteClient } from '../controllers/clientController';

const router = Router();

router.use(requireAuth);
router.get('/', listClients);
router.post('/', createClient);
router.get('/:id', getClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;