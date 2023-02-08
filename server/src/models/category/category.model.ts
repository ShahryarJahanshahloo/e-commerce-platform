import { model, Model } from 'mongoose'
import CategorySchema from './category.schema'

export enum categoryTypes {
  Main = 'Main',
  Middle = 'Middle',
  Leaf = 'Leaf',
}

export interface ICategory {
  type: categoryTypes
  name: string
  isActive: boolean
}
export interface ICategoryMethods {}
export interface CategoryModel extends Model<ICategory, {}, ICategoryMethods> {}

CategorySchema.pre('validate', function (next) {
  if (this.isNew) this.isActive = false
  next()
})

const Category = model<ICategory, CategoryModel>('Category', CategorySchema)
export default Category
