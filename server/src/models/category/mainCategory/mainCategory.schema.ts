import { Schema } from 'mongoose'
import {
  IMainCategory,
  IMainCategoryMethods,
  MainCategoryModel,
} from './mainCategory.model'
import { discriminatorKey } from '../category.schema'

const MainCategorySchema = new Schema<
  IMainCategory,
  MainCategoryModel,
  IMainCategoryMethods
>({}, { discriminatorKey })

MainCategorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
})

export default MainCategorySchema
