import { Router } from 'express'
import { MemoryStore } from 'express-brute'

const router = Router()

router.use(MemoryStore()) // Prevents brute force attacks

export default router
