import { Router } from 'express';

import Controllers from '../../controllers';
import MiddleWares from '../../middlewares';

const router = Router();

// prettier-ignore
router.route('/event/:id')
        .get(Controllers.secure.event.getEvent)
        .put(Controllers.secure.event.updateEvent)
        .delete(Controllers.secure.event.deleteEvent)

// prettier-ignore
router.route("/event")
        .get(Controllers.secure.event.getEvents)
        .post(Controllers.secure.event.createEvent)

export default router;
