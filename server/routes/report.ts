import { Router } from 'express'
import reportController from '../controllers/report'
const router = Router()

router.get('/fullAcademicPerformance', reportController.getFullAcademicPerformance)

export default router
