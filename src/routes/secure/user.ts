import { Router } from 'express';

import Controllers from '../../controllers';
import MiddleWares from '../../middlewares';

import { userSchema, everyFieldRequiredSchema, partiallyRequiredSchema } from '../../utils/schemas';

const createUser = everyFieldRequiredSchema(userSchema);
const updateUser = partiallyRequiredSchema(userSchema);

const router = Router();

router.use('/user/:id', MiddleWares.validation.checkUUIDParam('id')); // Check that :id is actually a UUID

// prettier-ignore
router.route('/user/:id')
	.get(Controllers.secure.user.getUser)
	.put(MiddleWares.validation.schemaValidation(updateUser), Controllers.secure.user.updateUser)
        .delete(Controllers.secure.user.deleteUser)

// prettier-ignore
router.route("/user")
        .get(Controllers.secure.user.getUsers)
        .post(MiddleWares.validation.schemaValidation(createUser), Controllers.secure.user.createUser)

export default router;
