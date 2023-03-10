import { Router } from 'express';
import artigoController from '../controllers/ArtigoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, artigoController.store);
router.put('/:id', loginRequired, artigoController.update);
router.delete('/:id', loginRequired, artigoController.delete);
router.get('/', loginRequired, artigoController.index);
router.get('/details/:id', loginRequired, artigoController.show);
router.get('/search', loginRequired, artigoController.filter);

export default router;
