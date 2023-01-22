import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { ApiStorageItem } from '../entities'
import { FormStorageItem } from '../forms'

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
