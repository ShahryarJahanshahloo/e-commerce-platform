import { Schema, Model } from 'mongoose'
import User, { IUser, IUserMethods, userRoles } from '../user.model'
import CustomerSchema from './customer.schema'

export interface ICustomer extends IUser {
  balance: number
  address?: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
    zipCode: number
  }
  cart: {
    storageItem: Schema.Types.ObjectId
    quantity: number
  }[]
}
export interface ICustomerMethods extends IUserMethods {}
export interface CustomerModel extends Model<ICustomer, {}, ICustomerMethods> {}

CustomerSchema.pre('validate', function (next) {
  if (this.isNew) this.balance = 0
  next()
})

const Customer = User.discriminator(userRoles.Customer, CustomerSchema)

export default Customer
