import { Router } from 'express';

import Middlewares from '../../middlewares';
import UserRouter from './user';
import ContributorRouter from './contributor';
import ProjectRouter from './project';
import EventRouter from './event';
import PostRouter from './post';

const router = Router();

router.use(Middlewares.auth.isAuth);

router.use(UserRouter);
router.use(ContributorRouter);
router.use(ProjectRouter);
router.use(EventRouter);
router.use(PostRouter);

export default router;
