import { Router } from 'express';
import livroController from '../controllers/LivroController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.post('/', loginRequired, livroController.store);
router.get('/', loginRequired, livroController.index);
router.get('/:id', loginRequired, livroController.show);
router.get('/search', loginRequired, livroController.filter);

export default router;
