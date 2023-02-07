import { IUser } from './models/user/user.model'
import { HydratedDocument } from 'mongoose'

declare global {
  namespace Express {
    export interface Request {
      user: HydratedDocument<IUser>
      token?: string
    }
  }
}

export {}
