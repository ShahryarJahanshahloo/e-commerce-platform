import { Schema } from 'mongoose'
import { IProduct, IProductMethods, ProductModel } from './product.model'

const ProductSchema = new Schema<IProduct, ProductModel, IProductMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: 511,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    isApproved: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    views: {
      type: Number,
      required: true,
      set: function (value: number) {
        return Math.trunc(value)
      },
    },
    featureValues: [
      {
        type: Schema.Types.ObjectId,
        ref: 'FeatureValue',
      },
    ],
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
    sold: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

ProductSchema.virtual('storageItems', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'product',
})

ProductSchema.virtual('rate').get(function (this) {
  let total = 0
  this.ratings.forEach(rating => {
    total += rating.value
  })
  return total / this.ratings.length
})

export default ProductSchema
