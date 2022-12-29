import { Schema, Model } from 'mongoose'

import User, { discriminatorKey, IUser, IUserMethods, userRoles } from './user'

export interface ICustomer extends IUser {
  balance: number
  address?: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
  }
}
interface ICustomerMethods extends IUserMethods {}
interface CustomerModel extends Model<ICustomer, {}, ICustomerMethods> {}

const CustomerSchema = new Schema<ICustomer, CustomerModel, ICustomerMethods>(
  {
    balance: {
      type: Number,
      required: true,
      set: function (value: number) {
        return Math.trunc(value)
      },
    },
    address: {
      type: {
        description: {
          type: String,
          required: true,
          maxLength: 511,
        },
        coordinates: {
          type: {
            lat: {
              type: Number,
              required: true,
            },
            lon: {
              type: Number,
              required: true,
            },
          },
          required: false,
        },
      },
      required: false,
    },
  },
  { discriminatorKey }
)

CustomerSchema.pre('save', function () {
  if (this.isNew) this.balance = 0
})

const Customer = User.discriminator(userRoles.Customer, CustomerSchema)

export default Customer
