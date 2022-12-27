import { Schema, model, Model } from 'mongoose'
import Category, {
  discriminatorKey,
  ICategory,
  ICategoryMethods,
  categoryTypes,
} from './category'

interface ILeafCategory extends ICategory {
  products: Schema.Types.ObjectId[]
  features: Schema.Types.ObjectId[]
}
interface ILeafCategoryMethods extends ICategoryMethods {}
interface LeafCategoryModel
  extends Model<ILeafCategory, {}, ILeafCategoryMethods> {}

const LeafCategorySchema = new Schema<
  ILeafCategory,
  LeafCategoryModel,
  ILeafCategoryMethods
>({}, { discriminatorKey })

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

const LeafCategory = Category.discriminator(
  categoryTypes.Leaf,
  LeafCategorySchema
)
export default LeafCategory
