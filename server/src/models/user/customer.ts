import { Schema, Model } from 'mongoose'

import User, { discriminatorKey, IUser, IUserMethods } from './user'

interface ICustomer extends IUser {
  balance: number
}
interface ICustomerMethods extends IUserMethods {}
interface CustomerModel extends Model<ICustomer, {}, ICustomerMethods> {}

const CustomerSchema = new Schema<ICustomer, CustomerModel, ICustomerMethods>(
  {
    balance: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { discriminatorKey }
)

const Customer = User.discriminator('Customer', CustomerSchema)
export default Customer
