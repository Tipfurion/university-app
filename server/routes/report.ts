import { Router } from 'express'
import reportController from '../controllers/report'
const router = Router()

router.get('/fullAcademicPerformance', reportController.getFullAcademicPerformance)
router.get('/arrears', reportController.getArrears)
router.get('/arrearsBiggerThanHalfYear', reportController.getArrearsBiggerThanHalfYear)
export default router
