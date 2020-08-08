import { Router } from 'express';

import Controllers from '../../controllers';
import Middlewares from '../../middlewares';

const router = Router();

// prettier-ignore
router
	.post('/login', Controllers.auth.login)
	.post('/register', Controllers.auth.register)
	.post('/logout', Controllers.auth.logout)

// prettier-ignore
router
	.post('/refresh_token', Controllers.auth.refreshToken);

export default router;
