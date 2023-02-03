import { RequestReturnType } from '../axios'
import request from '../axios'
import { ApiStorageItem, FormStorageItem } from './storageItem.entities'

export const CreateStorageItem = (
  storageItem: FormStorageItem
): RequestReturnType<ApiStorageItem> => {
  return request.post('/storage', { ...storageItem })
}

export const UpdateStorageItem = (
  storageItemId: string,
  updates: {
    price: number
    quantity: number
  }
): RequestReturnType<ApiStorageItem> => {
  return request.patch('/storage/' + storageItemId, { ...updates })
}

export const GetSaleReport = (
  sellerId: string
): RequestReturnType<ApiStorageItem[]> => {
  return request.get('/storage/seller/' + sellerId + '/report')
}
