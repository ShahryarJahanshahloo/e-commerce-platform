import { Schema, model, Model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const discriminatorKey = 'role'

interface IUser {
  name: string
  lastName: string
  email: string
  phoneNumber: number
  password: string
  tokens: []
}
interface IUserMethods {
  generateAccessToken(): string
}
interface UserModel extends Model<IUser, {}, IUserMethods> {}

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    lastName: { type: String, required: true, maxlength: 255 },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) throw new Error('Invalid Email!!')
      },
    },
    phoneNumber: { type: Number, required: false, maxlength: 15 },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      maxlength: 255,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    discriminatorKey,
  }
)

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

UserSchema.method(
  'generateAccessToken',
  async function generateAccessToken(): Promise<string> {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: '1800s',
      }
    )
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
  }
)

const User = model<IUser, UserModel>('User', UserSchema)
export { IUser, IUserMethods, discriminatorKey }
export default User
