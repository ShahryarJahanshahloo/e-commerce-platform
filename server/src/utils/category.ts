import Category, { ICategory } from '../models/category/category.model'
import { HydratedDocument } from 'mongoose'
import Product from '../models/product/product.model'
import MainCategory from '../models/category/mainCategory/mainCategory.model'
import LeafCategory from '../models/category/leafCategory/leafCategory.model'
import MiddleCategory from '../models/category/middleCategory/middleCategory.model'

export async function toggleActivity(
  category: HydratedDocument<ICategory>,
  newActivityState: boolean
) {
  category.isActive = newActivityState
  await category.save()
  if (category instanceof LeafCategory) {
    await Product.updateMany(
      { category: category.id },
      { isActive: newActivityState }
    )
  } else if (
    category instanceof MainCategory ||
    category instanceof MiddleCategory
  ) {
    category.children.forEach(async childId => {
      const childCategory = await Category.findById(childId)
      if (childCategory === null) throw new Error('invalid child')
      await toggleActivity(childCategory, newActivityState)
    })
  }
}
