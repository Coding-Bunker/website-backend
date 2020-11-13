import { Router } from 'express';

import Controllers from '../controllers';

import authRoutes from './auth';
import secureRoutes from './secure';

const router = Router();

router.use('/auth', authRoutes);
router.use('/secure', secureRoutes);

router.post('/newsletter', Controllers.newsletters);

export default router;
