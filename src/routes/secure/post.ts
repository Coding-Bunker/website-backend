import { Router } from 'express';

import Controllers from '../../controllers';
import MiddleWares from '../../middlewares';

import {
	postSchema,
	partiallyRequiredSchema,
	everyFieldRequiredSchema,
} from '.././../utils/schemas';

const router = Router();

// prettier-ignore
router.route('/post/:id')
        .get(Controllers.secure.post.getPost)
        .put(MiddleWares.validation.schemaValidation(partiallyRequiredSchema(postSchema)), Controllers.secure.post.updatePost)
        .delete(Controllers.secure.post.deletePost)

// prettier-ignore
router.route("/post")
        .get(Controllers.secure.post.getPosts)
        .post(MiddleWares.validation.schemaValidation(everyFieldRequiredSchema(postSchema)), Controllers.secure.post.createPost)

export default router;
