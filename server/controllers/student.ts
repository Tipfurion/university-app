import { Request, Response } from 'express'
import db from '../db'
import _ from 'lodash'
const studentController = {
    get: async (req: Request, res: Response) => {
        const items = await db('student')
            .select('*')
            .where({ deleted: false })
        return res.json(items)
    },
    create: async (req: Request, res: Response) => {
        const { name, surname, patronymic, phone, email } = req.body
        const items = await db('student')
            .insert({ name, surname, patronymic, phone, email })
            .returning('*')
        return res.json(items[0])
    },
    update: async (req: Request, res: Response) => {
        const { id, name, surname, patronymic, phone, email } = req.body
        const items = await db('student')
            .update(_.omitBy({ name, surname, patronymic, phone, email }, _.isNil))
            .where({ id })
            .returning('*')
        return res.json(items[0])
    },
    delete: async (req: Request, res: Response) => {
        const { id } = req.body
        await db('student')
            .update({ deleted: true })
            .where({ id })
            .returning('*')

        return res.json({ message: 'ok' })
    },
}
export default studentController
