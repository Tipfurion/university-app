import { Router } from 'express'
import academicPerformanceController from '../controllers/academicPerformance'
const router = Router()

router.get('/', academicPerformanceController.get)
router.post('/', academicPerformanceController.create)
router.put('/', academicPerformanceController.update)
router.delete('/', academicPerformanceController.delete)
export default router
