import { Router } from 'express'
import teacherController from '../controllers/teacher'
const router = Router()

router.get('/', teacherController.get)
router.post('/', teacherController.create)
router.put('/', teacherController.update)
router.delete('/', teacherController.delete)
export default router
