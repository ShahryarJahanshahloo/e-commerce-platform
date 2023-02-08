import LeafCategory from '../../models/category/leafCategory/leafCategory.model'
import { updateByValidKeys } from '../../utils/common'

export const create = async (body: any) => {
  const category = new LeafCategory(body)
  await category.save()
  return category
}

export const getFeaturesById = async (categoryId: any) => {
  const category = await LeafCategory.findById(categoryId)
  if (category === null) throw new Error()
  return category.features
}

export const findAndUpdate = async (categoryId: any, updates: any) => {
  const category = await LeafCategory.findById(categoryId)
  if (category === null) throw new Error()
  await updateByValidKeys(category, updates, ['name', 'parent'])
  return category
}
