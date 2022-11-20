import { Schema, model } from 'mongoose'

interface IUser {
  name: string
  lastName: string
  email: string
  phoneNumber: number
  password: string
}

const discriminatorKey = 'role'

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
  },
  {
    discriminatorKey,
  }
)

const User = model<IUser>('User', UserSchema)

export default User
export { discriminatorKey }
