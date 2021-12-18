import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import db from '../db'
const authController = {
    login: async (req: Request, res: Response) => {
        const { password, login } = req.body
        const user = await db('user')
            .select(['id', 'password_hash'])
            .where({ login })
            .first()
        if (!user) {
            res.status(403).json({ error: { message: 'invalid login' }, data: null })
        }
        if (bcrypt.compareSync(password, user.password_hash)) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_PRIVATE_KEY as string, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            })
            res.json({ error: null, data: { token } })
        } else {
            res.status(403).json({ error: { message: 'invalid password' }, data: null })
        }
    },
    me: async (req: Request, res: Response) => {
        const authHeader = req.headers['authorization']
        const token = authHeader!.replace('Bearer ', '')
        if (token) {
            jwt.verify(token, process.env.JWT_PRIVATE_KEY as string, async (error: any, decode: any) => {
                if (error) {
                    res.status(403).json({ error: { message: 'invalid token' }, data: null })
                } else {
                    const decodedToken = jwt.decode(token) as any
                    const user = await db('user')
                        .select(['id', 'type', 'login'])
                        .where({ id: decodedToken.userId })
                        .first()
                    res.status(200).json({ error: null, data: user })
                }
            })
        } else {
            res.status(400).json({ error: { message: 'token is undefined' }, data: null })
        }
    },
    logOut: (req: Request, res: Response) => {
        res.json({ error: null, data: { message: 'ok' } })
    },
}
export default authController
