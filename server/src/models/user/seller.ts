import { Schema, Model } from 'mongoose'

import User, { discriminatorKey, IUser, IUserMethods } from './user'

interface ISeller extends IUser {
  shopSlug: string
}
interface ISellerMethods extends IUserMethods {}
interface SellerModel extends Model<ISeller, {}, ISellerMethods> {}

const SellerSchema = new Schema<ISeller, SellerModel, ISellerMethods>(
  {
    shopSlug: {
      type: String,
      required: false,
    },
  },
  { discriminatorKey }
)

const Seller = User.discriminator('Seller', SellerSchema)

export default Seller
