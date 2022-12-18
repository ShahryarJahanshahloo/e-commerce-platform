import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import User from '../models/user/user'

interface JWTPayload {
  _id: string
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
    const user = await User.findOne(
      { _id: decoded._id, 'tokens.token': token },
      '_id tokens email role'
    )
    if (!user) {
      throw new Error()
    }
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: 'please authenticate.' })
  }
}

module.exports = auth
