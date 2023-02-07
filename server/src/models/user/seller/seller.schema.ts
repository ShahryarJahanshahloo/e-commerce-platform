import { Schema } from 'mongoose'
import { discriminatorKey } from '../user.model'
import { ISeller, ISellerMethods, SellerModel } from './seller.model'

const SellerSchema = new Schema<ISeller, SellerModel, ISellerMethods>(
  {
    shopSlug: {
      type: String,
      required: false,
    },
    balance: {
      type: Number,
      required: true,
      set: function (value: number) {
        return Math.trunc(value)
      },
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
      set: function (value: number) {
        return Math.trunc(value)
      },
    },
    ratings: {
      type: [
        {
          customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
          },
          value: {
            type: Number,
            min: 0,
            max: 5,
            set: function (value: number) {
              return Math.trunc(value)
            },
          },
        },
      ],
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
        zipCode: {
          type: Number,
          minlength: 10,
          maxlength: 10,
          set: function (value: number) {
            return Math.trunc(value)
          },
        },
      },
      required: true,
    },
  },
  { discriminatorKey }
)

SellerSchema.virtual('rate').get(function (this) {
  let total = 0
  this.ratings.forEach(rating => {
    total += rating.value
  })
  return total / this.ratings.length
})

export default SellerSchema
