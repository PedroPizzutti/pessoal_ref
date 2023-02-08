import { Router } from 'express';
import livroController from '../controllers/LivroController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.post('/', loginRequired, livroController.store);

export default router;
