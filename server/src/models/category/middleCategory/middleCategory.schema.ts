import { Schema } from 'mongoose'
import {
  IMiddleCategory,
  IMiddleCategoryMethods,
  MiddleCategoryModel,
} from './middleCategory.model'
import { discriminatorKey } from '../category.schema'

const MiddleCategorySchema = new Schema<
  IMiddleCategory,
  MiddleCategoryModel,
  IMiddleCategoryMethods
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

MiddleCategorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
})

export default MiddleCategorySchema
