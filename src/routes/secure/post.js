import { Router } from 'express';

import Controllers from '../../controllers';
import MiddleWares from '../../middlewares';

const router = Router();

// prettier-ignore
router.route('/post/:id')
        .get(Controllers.secure.post.getPost)
        .put(Controllers.secure.post.updatePost)
        .delete(Controllers.secure.post.deletePost)

// prettier-ignore
router.route("/post")
        .get(Controllers.secure.post.getPosts)
        .post(Controllers.secure.post.createPost)

export default router;
