import { Router } from 'express';
import artigoController from '../controllers/ArtigoController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.post('/', loginRequired, artigoController.store);

export default router;
