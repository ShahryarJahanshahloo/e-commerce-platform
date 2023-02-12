import request, { RequestReturnType } from '../axios'
import { ApiCartItem, FormCartItem } from './cart.entities'

export const GetCart = (): RequestReturnType<ApiCartItem[]> => {
  return request.get('/user/customer/cart')
}

export const AddToCart = (cartItem: FormCartItem): RequestReturnType<{}> => {
  return request.put('/user/customer/cart', { ...cartItem })
}

export const RemoveFromCart = (
  storageItemId: string
): RequestReturnType<{}> => {
  return request.delete('/user/customer/me/cart/' + storageItemId)
}
