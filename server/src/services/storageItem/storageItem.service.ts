import { updateByValidKeys } from '../../utils/common'
import StorageItem from '../../models/storageItem/storageItem.model'

export const create = async (body: any, sellerId: any) => {
  const storageItem = new StorageItem({ ...body, seller: sellerId })
  await storageItem.save()
  return storageItem
}

export const findAndUpdate = async (storageItemId: any, updates: any) => {
  const storageItem = await StorageItem.findById(storageItemId)
  if (storageItem === null) throw new Error()
  await updateByValidKeys(storageItem, updates, ['price', 'quantity'])
  return storageItem
}

export const findBySellerId = async (sellerId: any) => {
  const products = await StorageItem.find({ seller: sellerId })
  return products
}
