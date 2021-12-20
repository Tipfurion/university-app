import { Router } from 'express'
import formOfControlController from '../controllers/formOfControl'
const router = Router()

router.get('/', formOfControlController.get)
router.post('/', formOfControlController.create)
router.put('/', formOfControlController.update)
router.delete('/', formOfControlController.delete)
export default router
