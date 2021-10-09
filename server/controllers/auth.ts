const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import { Request, Response } from 'express'
const authController = {
    login: (req: Request, res: Response) => {
        console.log('req.body', req.body)

        const token = jwt.sign({ userId: 1 }, process.env.JWT_PRIVATE_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        })
        res.json({ error: null, data: { token } })
    },
    me: (req: Request, res: Response) => {
        const token = req.headers['authorization']
        const newToken = token!.replace('Bearer ', '')
        if (token) {
            jwt.verify(newToken, process.env.JWT_PRIVATE_KEY, (error: any, decode: any) => {
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
