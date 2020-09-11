import { Router } from 'express';

import Controllers from '../../controllers';
import MiddleWares from '../../middlewares';

import {
	contributorSchema,
	partiallyRequiredSchema,
	everyFieldRequiredSchema,
} from '.././../utils/schemas';

const router = Router();

// prettier-ignore
router.route('/contributor/:id')
        .get(Controllers.secure.contributor.getContributor)
        .put(MiddleWares.validation.schemaValidation(partiallyRequiredSchema(contributorSchema)), Controllers.secure.contributor.updateContributor)
        .delete(Controllers.secure.contributor.deleteContributor)

// prettier-ignore
router.route("/contributor")
        .get(Controllers.secure.contributor.getContributors)
        .post(MiddleWares.validation.schemaValidation(everyFieldRequiredSchema(contributorSchema)), Controllers.secure.contributor.createContributor)

export default router;
