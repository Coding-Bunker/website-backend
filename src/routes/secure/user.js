import { Router } from 'express';

import Controllers from '../../controllers';
import MiddleWares from '../../middlewares';

const router = Router();

// prettier-ignore
router.route('/user/:id')
	.get(Controllers.secure.user.getUser)
	.put(Controllers.secure.user.updateUser)
        .delete(Controllers.secure.user.deleteUser)

// prettier-ignore
router.route("/user")
        .get(Controllers.secure.user.getUsers)
        .post(Controllers.secure.user.createUser)

export default router;
