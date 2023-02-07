import validator from 'validator'
import { IUser, IUserMethods, UserModel, discriminatorKey } from './user.model'
import { Schema } from 'mongoose'

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    lastName: { type: String, required: false, maxlength: 255 },
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
    phoneNumber: { type: Number, required: false, unique: true, maxlength: 15 },
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
    toJSON: {
      transform: function (doc, ret) {
        delete ret.tokens
        delete ret.password
      },
    },
  }
)

export default UserSchema
