import { model, Model, HydratedDocument } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserSchema from './user.schema'

export enum userRoles {
  Admin = 'Admin',
  Customer = 'Customer',
  Seller = 'Seller',
}

export interface IUser {
  role: userRoles
  name: string
  lastName?: string
  email: string
  phoneNumber?: number
  password: string
  tokens: { token: string }[]
}
export interface IUserMethods {
  generateAccessToken(): Promise<string>
}
export interface UserModel extends Model<IUser, {}, IUserMethods> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>
}

UserSchema.method(
  'generateAccessToken',
  async function generateAccessToken(): Promise<string> {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.JWT_SECRET
      // {
      //   expiresIn: '1800s',
      // }
    )
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
  }
)

UserSchema.static(
  'findByCredentials',
  async function findByCredentials(
    email,
    password
  ): Promise<HydratedDocument<IUser, IUserMethods>> {
    const user = await this.findOne({ email })
    if (!user) throw new Error('no user found with the provided email')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('wrong password')
    return user
  }
)

UserSchema.pre('validate', function (next) {
  if (this.isNew) {
    this.tokens = []
  }
  next()
})

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

const User = model<IUser, UserModel>('User', UserSchema)
export default User
