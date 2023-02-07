import { Schema, Model } from 'mongoose'
import Category, {
  ICategory,
  ICategoryMethods,
  categoryTypes,
} from '../category.model'
import MainCategorySchema from './mainCategory.schema'

export interface IMainCategory extends ICategory {
  children: Schema.Types.ObjectId[]
}
export interface IMainCategoryMethods extends ICategoryMethods {}
export interface MainCategoryModel
  extends Model<IMainCategory, {}, IMainCategoryMethods> {}

const MainCategory = Category.discriminator(
  categoryTypes.Main,
  MainCategorySchema
)
export default MainCategory
