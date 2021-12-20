import { Request, Response } from 'express'
import db from '../db'
import _ from 'lodash'
const formOfControlController = {
    get: async (req: Request, res: Response) => {
        const items = await db('form_of_control')
            .select('*')
            .where({ deleted: false })
        return res.json(items)
    },
    create: async (req: Request, res: Response) => {
        const { subject, control_form, semester, curriculum_id, teacher_id, exam_date } = req.body
        const items = await db('form_of_control')
            .insert({ subject, control_form, semester, curriculum_id, teacher_id, exam_date })
            .returning('*')

        return res.json(items[0])
    },
    update: async (req: Request, res: Response) => {
        const { id, subject, control_form, semester, curriculum_id, teacher_id, exam_date } = req.body
        const items = await db('form_of_control')
            .update(_.omitBy({ subject, control_form, semester, curriculum_id, teacher_id, exam_date }, _.isNil))
            .where({ id })
            .returning('*')

        return res.json(items[0])
    },
    delete: async (req: Request, res: Response) => {
        const { id } = req.body
        await db('form_of_control')
            .update({ deleted: true })
            .where({ id })
            .returning('*')

        return res.json({ message: 'ok' })
    },
}
export default formOfControlController
