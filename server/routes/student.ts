import { Router } from 'express'
import studentController from '../controllers/student'
const router = Router()

router.get('/', studentController.get)
router.post('/', studentController.create)
router.put('/', studentController.update)
router.delete('/', studentController.delete)
export default router
