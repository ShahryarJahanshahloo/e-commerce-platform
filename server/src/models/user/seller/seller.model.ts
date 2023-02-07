import { Schema, Model } from 'mongoose'
import User, { IUser, IUserMethods, userRoles } from '../user.model'
import SellerSchema from './seller.schema'

export interface ISeller extends IUser {
  shopSlug?: string
  description?: string
  balance: number
  account: number
  ratings: {
    customer: Schema.Types.ObjectId
    value: number
  }[]
  rate: number
  address: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
    zipCode: number
  }
}
export interface ISellerMethods extends IUserMethods {}
export interface SellerModel extends Model<ISeller, {}, ISellerMethods> {}

SellerSchema.pre('validate', function (next) {
  if (this.isNew) {
    this.balance = 0
    this.ratings = []
  }
  next()
})

const Seller = User.discriminator(userRoles.Seller, SellerSchema)

export default Seller
