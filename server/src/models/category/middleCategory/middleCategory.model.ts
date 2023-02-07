import { Schema, Model } from 'mongoose'
import Category, {
  ICategory,
  ICategoryMethods,
  categoryTypes,
} from '../category.model'
import MiddleCategorySchema from './middleCategory.schema'

export interface IMiddleCategory extends ICategory {
  children: Schema.Types.ObjectId[]
  parent: Schema.Types.ObjectId
}
export interface IMiddleCategoryMethods extends ICategoryMethods {}
export interface MiddleCategoryModel
  extends Model<IMiddleCategory, {}, IMiddleCategoryMethods> {}

MiddleCategorySchema.pre('validate', async function (next) {
  const parent = await Category.findById(this.parent)
  if (parent === null) throw new Error('parent category not found')
  if (parent.type === categoryTypes.Leaf)
    throw new Error('parent category is leaf')
  next()
})

const MiddleCategory = Category.discriminator(
  categoryTypes.Middle,
  MiddleCategorySchema
)
export default MiddleCategory
