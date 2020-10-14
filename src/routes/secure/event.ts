import { Router } from 'express';

import Controllers from '../../controllers';
import MiddleWares from '../../middlewares';

import {
	eventSchema,
	partiallyRequiredSchema,
	everyFieldRequiredSchema,
} from '.././../utils/schemas';

const router = Router();

// prettier-ignore
router.route('/event/:id')
        .get(Controllers.secure.event.getEvent)
        .put(MiddleWares.validation.schemaValidation(partiallyRequiredSchema(eventSchema)), Controllers.secure.event.updateEvent)
        .delete(Controllers.secure.event.deleteEvent)

// prettier-ignore
router.route("/event")
        .get(Controllers.secure.event.getEvents)
        .post(MiddleWares.validation.schemaValidation(everyFieldRequiredSchema(eventSchema)), Controllers.secure.event.createEvent)

export default router;
