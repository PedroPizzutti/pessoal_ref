import { Router } from 'express';
import artigoController from '../controllers/ArtigoController';

const router = new Router();

router.post('/', artigoController.store);

export default router;
