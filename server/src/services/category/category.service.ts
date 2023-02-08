import Category from '../../models/category/category.model'
import mongoose from 'mongoose'
import { toggleActivity } from '../../utils/category'

export const findById = async (categoryId: any) => {
  const category = await Category.findById(categoryId)
  if (category === null) throw new Error()
  return category
}

export const changeActivity = async (categoryId: any, value: boolean) => {
  const session = await mongoose.connection.startSession()
  try {
    session.startTransaction()
    const category = await Category.findById(categoryId)
    if (category === null) throw new Error()
    await toggleActivity(category, value)
    await session.commitTransaction()
    session.endSession()
    return category
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw new Error()
  }
}
