import { Schema, Model } from 'mongoose'
import Category, {
  ICategory,
  ICategoryMethods,
  categoryTypes,
} from '../category.model'
import LeafCategorySchema from './leafCategory.schema'

export interface ILeafCategory extends ICategory {
  products: Schema.Types.ObjectId[]
  features: Schema.Types.ObjectId[]
  parent: Schema.Types.ObjectId
}
export interface ILeafCategoryMethods extends ICategoryMethods {}
export interface LeafCategoryModel
  extends Model<ILeafCategory, {}, ILeafCategoryMethods> {}

LeafCategorySchema.pre('validate', async function (next) {
  const parent = await Category.findById(this.parent)
  if (parent === null) throw new Error('parent category not found')
  if (parent.type === categoryTypes.Leaf)
    throw new Error('parent category is leaf')
  next()
})

const LeafCategory = Category.discriminator(
  categoryTypes.Leaf,
  LeafCategorySchema
)
export default LeafCategory
