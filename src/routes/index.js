import { Router } from 'express'

import Controllers from '../controllers'

import authRoutes from './auth'
import secureRoutes from './secure'

const router = Router()

router.use(authRoutes)
router.use(secureRoutes)

router.post('/newsletter', Controllers.newsletters)

export default router
