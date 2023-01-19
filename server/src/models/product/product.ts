import { Schema, model, Model } from 'mongoose'
import LeafCategory from '../category/leafCategory'
import FeatureValue from '../feature/featureValue'
import Category from '../category/category'

export interface IProduct {
  name: string
  description?: string
  category: Schema.Types.ObjectId
  isApproved: boolean
  isActive: boolean
  views: number
  featureValues: Schema.Types.ObjectId[]
  ratings: {
    customer: Schema.Types.ObjectId
    value: number
  }[]
  sold: number
}
interface IProductMethods {}
interface ProductModel extends Model<IProduct, {}, IProductMethods> {
  getCategoryProducts(
    categoryId: string,
    options: getCategoryProductsOptions
  ): []
}

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

export type getCategoryProductsOptions = {
  limit: number
  offset: number
  availableOnly: boolean
  minPrice: number
  maxPrice: number
  sortedBy: 'time' | 'view' | 'price_asc' | 'price_desc' | 'sold'
  features: string[]
}

ProductSchema.static(
  'getCategoryProducts',
  async function (categoryId: string, options: getCategoryProductsOptions) {
    return this.find({ isActive: true, isApproved: true }, null, {
      limit: options.limit,
      skip: options.offset,
    }).populate(['featureValues', 'storageItems'])
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

ProductSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.views = 0
    this.isActive = false
    this.isApproved = false
    this.ratings = []
    this.sold = 0
  }

  const category = await LeafCategory.findById(this.category)
  if (category === null) throw new Error('category not found')

  for (const featureValueId of this.featureValues) {
    const featureValue = await FeatureValue.findById(featureValueId)
    if (featureValue == null) throw new Error('invalid feaure')
    if (category.features.includes(featureValue.feature) == false)
      throw new Error('invald feature')
  }

  next()
})

const Product = model<IProduct, ProductModel>('Product', ProductSchema)
export default Product
