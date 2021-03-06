import { Router } from 'express'
import groupController from '../controllers/group'
const router = Router()

router.get('/', groupController.get)
router.post('/', groupController.create)
router.put('/', groupController.update)
router.delete('/', groupController.delete)
export default router
