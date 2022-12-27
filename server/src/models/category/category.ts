import { Schema, model, Model } from 'mongoose'

const discriminatorKey = 'type'

export enum categoryTypes {
  Main = 'Main',
  Middle = 'Middle',
  Leaf = 'Leaf',
}

interface ICategory {
  type: categoryTypes
  name: string
  parent?: Schema.Types.ObjectId
  isActive: boolean
}
interface ICategoryMethods {}
interface CategoryModel extends Model<ICategory, {}, ICategoryMethods> {}

const CategorySchema = new Schema<ICategory, CategoryModel, ICategoryMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { discriminatorKey }
)

CategorySchema.pre('save', async function (next) {
  if (this.parent !== undefined) {
    const parent = await Category.findById(this.parent)
    if (parent === null) throw new Error('parent category not found')
    if (parent.type === categoryTypes.Leaf)
      throw new Error('parent category is leaf')
  }
  next()
})

const Category = model<ICategory, CategoryModel>('Category', CategorySchema)
export { ICategory, ICategoryMethods, discriminatorKey }
export default Category
