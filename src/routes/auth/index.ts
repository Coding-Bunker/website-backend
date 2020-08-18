import { Router } from 'express';

import Controllers from '../../controllers';
import Middlewares from '../../middlewares';

import { userAuthSchema } from '../../utils/schemas';
const router = Router();

// prettier-ignore
router
	.post('/login', Middlewares.validation.schemaValidation(userAuthSchema), Controllers.auth.login)
	.post('/register', Middlewares.validation.schemaValidation(userAuthSchema), Controllers.auth.register)
	.post('/logout', Controllers.auth.logout)
	.post('/generate_api_key', Middlewares.auth.isAuth, Controllers.auth.genApiKey)
// prettier-ignore
router
	.post('/refresh_token', Controllers.auth.refreshToken);

export default router;
