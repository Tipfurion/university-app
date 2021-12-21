import { Request, Response } from 'express'
import db from '../db'
import _ from 'lodash'
const academicPerformanceController = {
    get: async (req: Request, res: Response) => {
        const items = await db('academic_performance')
            .select('*')
            .where({ deleted: false })
        return res.json(items)
    },
    create: async (req: Request, res: Response) => {
        const { student_id, mark, form_of_control_id, complete_date } = req.body
        const items = await db('academic_performance')
            .insert({ student_id, mark, form_of_control_id, complete_date: complete_date ? complete_date : null })
            .returning('*')

        return res.json(items[0])
    },
    update: async (req: Request, res: Response) => {
        const { id, student_id, mark, form_of_control_id, complete_date } = req.body

        const items = await db('academic_performance')
            .update(
                _.omitBy(
                    { student_id, mark, form_of_control_id, complete_date: complete_date ? complete_date : null },
                    _.isUndefined
                )
            )
            .where({ id })
            .returning('*')

        return res.json(items[0])
    },
    delete: async (req: Request, res: Response) => {
        const { id } = req.body
        await db('academic_performance')
            .update({ deleted: true })
            .where({ id })
            .returning('*')

        return res.json({ message: 'ok' })
    },
}
export default academicPerformanceController
