import { Request, Response } from 'express'
import db from '../db'
import _ from 'lodash'
const teacherController = {
    get: async (req: Request, res: Response) => {
        const items = await db('teacher')
            .select('*')
            .where({ deleted: false })
        return res.json(items)
    },
    create: async (req: Request, res: Response) => {
        const { name, surname, patronymic, phone, email, department } = req.body
        const items = await db('teacher')
            .insert({ name, surname, patronymic, phone, email, department })
            .returning('*')
        return res.json(items[0])
    },
    update: async (req: Request, res: Response) => {
        const { id, name, surname, patronymic, phone, email, department } = req.body
        const items = await db('teacher')
            .update(_.omitBy({ name, surname, patronymic, phone, email, department }, _.isNil))
            .where({ id })
            .returning('*')
        return res.json(items[0])
    },
    delete: async (req: Request, res: Response) => {
        const { id } = req.body
        await db('teacher')
            .update({ deleted: true })
            .where({ id })
            .returning('*')

        return res.json({ message: 'ok' })
    },
}
export default teacherController
