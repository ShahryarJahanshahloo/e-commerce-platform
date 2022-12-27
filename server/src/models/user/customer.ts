import { Schema, Model } from 'mongoose'

import User, { discriminatorKey, IUser, IUserMethods, userRoles } from './user'

interface ICustomer extends IUser {
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
      default: 0,
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

const Customer = User.discriminator(userRoles.Customer, CustomerSchema)

export default Customer
