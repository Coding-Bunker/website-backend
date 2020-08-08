import { Router } from 'express';

import Middlewares from '../../middlewares';

const router = Router();

router.use(Middlewares.auth.isAuth);

export default router;
