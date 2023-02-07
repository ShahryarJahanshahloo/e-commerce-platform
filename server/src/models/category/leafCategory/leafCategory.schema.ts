import { Schema } from 'mongoose'
import {
  ILeafCategory,
  ILeafCategoryMethods,
  LeafCategoryModel,
} from './leafCategory.model'
import { discriminatorKey } from '../category.model'

const LeafCategorySchema = new Schema<
  ILeafCategory,
  LeafCategoryModel,
  ILeafCategoryMethods
>(
  {
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { discriminatorKey }
)

LeafCategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
})

LeafCategorySchema.virtual('features', {
  ref: 'Feature',
  localField: '_id',
  foreignField: 'category',
})

export default LeafCategorySchema
