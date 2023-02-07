import { Schema } from 'mongoose'
import {
  CategoryModel,
  ICategory,
  ICategoryMethods,
  discriminatorKey,
} from './category.model'

const CategorySchema = new Schema<ICategory, CategoryModel, ICategoryMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { discriminatorKey }
)

export default CategorySchema
