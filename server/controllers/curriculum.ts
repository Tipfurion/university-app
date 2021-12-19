import { Request, Response } from 'express'
import db from '../db'
import _ from 'lodash'
const curriculumController = {
    get: async (req: Request, res: Response) => {
        const items = await db('curriculum')
            .select('*')
            .where({ deleted: false })
        return res.json(items)
    },
    create: async (req: Request, res: Response) => {
        const { education_form, start_date, groupIds } = req.body
        const items = await db('curriculum')
            .insert({ education_form, start_date })
            .returning('*')
        if (groupIds) {
            await db('group')
                .update({ curriculum_id: items[0].id })
                .whereIn('id', groupIds)
        }
        return res.json(items[0])
    },
    update: async (req: Request, res: Response) => {
        const { id, education_form, start_date, groupIds } = req.body
        const items = await db('curriculum')
            .update(_.omitBy({ education_form, start_date }, _.isNil))
            .where({ id })
            .returning('*')
        if (groupIds) {
            await db('group')
                .update({ curriculum_id: items[0].id })
                .whereIn('id', groupIds)
        }
        return res.json(items[0])
    },
    delete: async (req: Request, res: Response) => {
        const { id } = req.body
        await db('curriculum')
            .update({ deleted: true })
            .where({ id })
            .returning('*')

        return res.json({ message: 'ok' })
    },
}
export default curriculumController
