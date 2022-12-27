import { Schema, model, Model } from 'mongoose'
import Category, {
  discriminatorKey,
  ICategory,
  ICategoryMethods,
  categoryTypes,
} from './category'

interface IMiddleCategory extends ICategory {
  children: Schema.Types.ObjectId[]
}
interface IMiddleCategoryMethods extends ICategoryMethods {}
interface MiddleCategoryModel
  extends Model<IMiddleCategory, {}, IMiddleCategoryMethods> {}

const MiddleCategorySchema = new Schema<
  IMiddleCategory,
  MiddleCategoryModel,
  IMiddleCategoryMethods
>({}, { discriminatorKey })

MiddleCategorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
})

const MiddleCategory = Category.discriminator(
  categoryTypes.Middle,
  MiddleCategorySchema
)
export default MiddleCategory
