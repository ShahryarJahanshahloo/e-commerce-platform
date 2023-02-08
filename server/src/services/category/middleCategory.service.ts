import MiddleCategory from '../../models/category/middleCategory/middleCategory.model'
import { updateByValidKeys } from '../../utils/common'

export const create = async (body: any) => {
  const category = new MiddleCategory(body)
  await category.save()
  return category
}

export const findAndUpdate = async (categoryId: any, updates: any) => {
  const category = await MiddleCategory.findById(categoryId)
  if (category === null) throw new Error()
  await updateByValidKeys(category, updates, ['name', 'parent'])
  return category
}
