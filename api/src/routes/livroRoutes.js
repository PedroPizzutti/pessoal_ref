import { Router } from 'express';
import livroController from '../controllers/LivroController';

const router = new Router();

router.post('/', livroController.store);

export default router;
