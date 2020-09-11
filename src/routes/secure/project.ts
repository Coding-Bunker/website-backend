import { Router } from 'express';

import Controllers from '../../controllers';
import MiddleWares from '../../middlewares';

const router = Router();

import {
	projectSchema,
	partiallyRequiredSchema,
	everyFieldRequiredSchema,
} from '.././../utils/schemas';

// prettier-ignore
router.route('/project/:id')
        .get(Controllers.secure.project.getProject)
        .put(MiddleWares.validation.schemaValidation(partiallyRequiredSchema(projectSchema)), Controllers.secure.project.updateProject)
        .delete(Controllers.secure.project.deleteProject)

// prettier-ignore
router.route("/project")
        .get(Controllers.secure.project.getProjects)
        .post(MiddleWares.validation.schemaValidation(everyFieldRequiredSchema(projectSchema)), Controllers.secure.project.createProject)

export default router;
