import { Router } from 'express';

import Controllers from '../../controllers';
import MiddleWares from '../../middlewares';

const router = Router();

// prettier-ignore
router.route('/project/:id')
	    .get(Controllers.secure.project.getProject)
	    .put(Controllers.secure.project.updateProject)
        .delete(Controllers.secure.project.deleteProject)

// prettier-ignore
router.route("/project")
        .get(Controllers.secure.project.getProjects)
        .post(Controllers.secure.project.createProject)

export default router;
