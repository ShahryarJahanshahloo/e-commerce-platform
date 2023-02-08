import MainCategory from '../../models/category/mainCategory/mainCategory.model'
import { updateByValidKeys } from '../../utils/common'

export const create = async (body: any) => {
  const category = new MainCategory(body)
  await category.save()
  return category
}

export const getAll = async () => {
  const mainCategories = await MainCategory.find({ isActive: true })
  return mainCategories
}

export const getChildrenById = async (categoryId: any) => {
  const category = await MainCategory.findById(categoryId, {
    isActive: true,
  })
  return category?.children
}

export const findAndUpdate = async (categoryId: any, updates: any) => {
  const category = await MainCategory.findById(categoryId)
  if (category === null) throw new Error()
  await updateByValidKeys(category, updates, ['name'])
  return category
}
