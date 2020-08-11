import { Router } from 'express';

import Middlewares from '../../middlewares';
import UserRouter from './user';

const router = Router();

router.use(Middlewares.auth.isAuth);
router.use(UserRouter);

export default router;
