import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { ApiCustomer, ApiProduct } from '../entities'
import { FormCartItem, FormCustomer } from '../forms'

export const CreateCustomer = (
  customer: FormCustomer
): RequestReturnType<ApiCustomer> => {
  return request.post('/user/customer', { ...customer })
}

export const GetMe = (): RequestReturnType<ApiCustomer> => {
  return request.get('/user/customer/me')
}

export const AddToCart = (cartItem: FormCartItem): RequestReturnType<{}> => {
  return request.put('/user/customer/cart', { ...cartItem })
}

export const RemoveFromCart = (
  storageItemId: string
): RequestReturnType<{}> => {
  return request.delete('/user/customer/cart/' + storageItemId)
}

export const UpdateMeCustomer = (updates: {
  name: string
  lastName: string
  phoneNumber: number
  address: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
    zipCode: number
  }
}): RequestReturnType<ApiCustomer> => {
  return request.patch('/user/customer/me', { ...updates })
}
