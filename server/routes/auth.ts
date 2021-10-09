import { Router } from 'express'
import authController from '../controllers/auth'
const router = Router()

router.post('/login', authController.login)
router.post('/logout', authController.logOut)
router.get('/me', authController.me)
export default router
