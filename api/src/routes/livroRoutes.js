import { Router } from 'express';
import livroController from '../controllers/LivroController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, livroController.store);
router.put('/:id', loginRequired, livroController.update);
router.delete('/:id', loginRequired, livroController.delete);
router.get('/', loginRequired, livroController.index);
router.get('/:id', loginRequired, livroController.show);
router.get('/search', loginRequired, livroController.filter);

export default router;
