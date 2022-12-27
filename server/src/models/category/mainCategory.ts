import { Schema, model, Model } from 'mongoose'
import Category, {
  discriminatorKey,
  ICategory,
  ICategoryMethods,
  categoryTypes,
} from './category'

interface IMainCategory extends ICategory {}
interface IMainCategoryMethods extends ICategoryMethods {}
interface MainCategoryModel
  extends Model<IMainCategory, {}, IMainCategoryMethods> {}

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

const MainCategory = Category.discriminator(
  categoryTypes.Main,
  MainCategorySchema
)
export default MainCategory
