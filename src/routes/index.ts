import { Router } from 'express';

import Controllers from '../controllers';

import authRoutes from './auth';
import secureRoutes from './secure';

const router = Router();

router.use('/auth', authRoutes);
router.use('/secure', secureRoutes);

router.post('/newsletter', Controllers.newsletters);

router.get('*', (req, res) => {
	console.log('here');
	res.redirect('/admin');
});
router.use((req, res, next) => res.status(404).json());
export default router;
