import { Router } from 'express';

import Controllers from '../../controllers';
import MiddleWares from '../../middlewares';

const router = Router();

// prettier-ignore
router.route('/contributor/:id')
        .get(Controllers.secure.contributor.getContributor)
        .put(Controllers.secure.contributor.updateContributor)
        .delete(Controllers.secure.contributor.deleteContributor)

// prettier-ignore
router.route("/contributor")
        .get(Controllers.secure.contributor.getContributors)
        .post(Controllers.secure.contributor.createContributor)

export default router;
