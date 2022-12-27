import { Schema, Model } from 'mongoose'

import User, { discriminatorKey, IUser, IUserMethods, userRoles } from './user'

interface ISeller extends IUser {
  shopSlug?: string
  description?: string
  account: number
  score: number
  address: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
  }
}
interface ISellerMethods extends IUserMethods {}
interface SellerModel extends Model<ISeller, {}, ISellerMethods> {}

const SellerSchema = new Schema<ISeller, SellerModel, ISellerMethods>(
  {
    shopSlug: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
      maxlength: 1023,
      trim: true,
    },
    account: {
      type: Number,
      required: true,
      maxlength: 16,
      minlength: 16,
    },
    score: {
      type: Number,
      default: 0,
      required: true,
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
      required: true,
    },
  },
  { discriminatorKey }
)

const Seller = User.discriminator(userRoles.Seller, SellerSchema)

export default Seller
