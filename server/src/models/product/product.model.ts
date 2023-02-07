import { Schema, model, Model } from 'mongoose'
import LeafCategory from '../category/leafCategory/leafCategory.model'
import FeatureValue from '../featureValue/featureValue.model'
import ProductSchema from './product.schema'

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
export interface IProductMethods {}
export interface ProductModel extends Model<IProduct, {}, IProductMethods> {
  getCategoryProducts(
    categoryId: string,
    options?: getCategoryProductsOptions
  ): []
}

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
  async function (categoryId: string, options?: getCategoryProductsOptions) {
    return this.find({ isActive: true, isApproved: true }, null, {
      limit: options?.limit,
      skip: options?.offset,
    }).populate(['featureValues', 'storageItems'])
  }
)

ProductSchema.pre('validate', async function (next) {
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
