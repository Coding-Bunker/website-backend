import { Router } from "express"
import Controllers from "../controllers"

const router = Router();

router.post('/newsletter', Controllers.newsletters);


export default router;