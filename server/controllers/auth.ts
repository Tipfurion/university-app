import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import db from '../db'
const authController = {
    login: async (req: Request, res: Response) => {
        const { password, login } = req.body
        const pwdHash = (
            await db('user')
                .select('password_hash')
                .where({ login })
                .first()
        ).password_hash
        if (bcrypt.compareSync(password, pwdHash)) {
            const token = jwt.sign({ userId: 1 }, process.env.JWT_PRIVATE_KEY as string, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            })
            res.json({ error: null, data: { token } })
        } else {
            res.status(403).json({ error: { message: 'invalid login or password' }, data: null })
        }
    },
    me: (req: Request, res: Response) => {
        const token = req.headers['authorization']
        const newToken = token!.replace('Bearer ', '')
        if (token) {
            jwt.verify(newToken, process.env.JWT_PRIVATE_KEY as string, (error: any, decode: any) => {
                if (error) {
                    res.status(403).json({ error: { message: 'invalid token' }, data: null })
                } else {
                    res.status(200).json({ error: null, data: { name: 'Ruslan' } })
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
