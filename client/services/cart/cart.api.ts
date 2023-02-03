import request, { RequestReturnType } from '../axios'
import { ApiCartItem, FormCartItem } from './cart.entities'

// export const GetCart = (): RequestReturnType<ApiCartItem[]> => {
//  return request.get('/user/customer/me/cart')
// }

export const GetCart = (): ApiCartItem[] => {
  return [
    {
      storageItem: 'mamad1',
      price: 123,
      productId: 'product1',
      productName: 'product1',
      quantity: 13,
    },
    {
      storageItem: 'mamad2',
      price: 1241,
      productId: 'product2',
      productName: 'product2',
      quantity: 1,
    },
  ]
}

export const AddToCart = (cartItem: FormCartItem): RequestReturnType<{}> => {
  return request.put('/user/customer/me/cart', { ...cartItem })
}

export const RemoveFromCart = (
  storageItemId: string
): RequestReturnType<{}> => {
  return request.delete('/user/customer/me/cart/' + storageItemId)
}
