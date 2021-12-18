import { Request, Response } from 'express'
import db from '../db'
import _ from 'lodash'
const groupController = {
    get: async (req: Request, res: Response) => {
        const items = await db('group')
            .select('*')
            .where({ deleted: false })
        return res.json(items)
    },
    create: async (req: Request, res: Response) => {
        const { code, speciality } = req.body
        const items = await db('group')
            .insert({ code, speciality })
            .returning('*')
        return res.json(items[0])
    },
    update: async (req: Request, res: Response) => {
        const { id, code, speciality } = req.body
        const items = await db('group')
            .update(_.omitBy({ code, speciality }, _.isNil))
            .where({ id })
            .returning('*')
        return res.json(items[0])
    },
}
export default groupController
