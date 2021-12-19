import { Router } from 'express'
import curriculumController from '../controllers/curriculum'
const router = Router()

router.get('/', curriculumController.get)
router.post('/', curriculumController.create)
router.put('/', curriculumController.update)
router.delete('/', curriculumController.delete)
export default router
