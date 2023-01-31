import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import {
  FormAdmin,
  FormCartItem,
  FormCustomer,
  FormSeller,
  FormSellerVote,
  FormSignInCreds,
} from '../forms'
import {
  ApiAdmin,
  ApiCartItem,
  ApiCustomer,
  ApiSeller,
  ApiUser,
} from './entities'

export const Login = (creds: FormSignInCreds): RequestReturnType<ApiUser> => {
  return request.post('/user/login', { ...creds })
}

export const Logout = (): RequestReturnType<ApiUser> => {
  return request.post('/user/logout')
}

export const LogoutAll = (): RequestReturnType<ApiUser> => {
  return request.post('/user/logout/all')
}

export const CreateAdmin = (admin: FormAdmin): RequestReturnType<ApiAdmin> => {
  return request.post('/user/admin', { ...admin })
}

export const GetMeAdmin = (): RequestReturnType<ApiAdmin> => {
  return request.get('/user/admin/me')
}

export const UpdateMeAdmin = (
  adminId: string,
  updates: {
    name: string
    lastName: string
    phoneNumber: number
  }
): RequestReturnType<ApiAdmin> => {
  return request.patch('/user/admin/' + adminId, { ...updates })
}

export const CreateCustomer = (
  customer: FormCustomer
): RequestReturnType<ApiCustomer> => {
  return request.post('/user/customer', { ...customer })
}

export const GetMeCustomer = (): RequestReturnType<ApiCustomer> => {
  return request.get('/user/customer/me')
}

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

export const CreateSeller = (
  seller: FormSeller
): RequestReturnType<ApiSeller> => {
  return request.post('/user/seller', { ...seller })
}

export const RateSeller = (
  sellerId: string,
  rate: FormSellerVote
): RequestReturnType<{}> => {
  return request.put('/user/seller/' + sellerId + '/rate', { ...rate })
}

export const UnrateSeller = (sellerId: string): RequestReturnType<{}> => {
  return request.delete('/user/seller/' + sellerId + '/rate')
}

export const GetMeSeller = (): RequestReturnType<ApiSeller> => {
  return request.get('/user/seller/me')
}

export const UpdateMeSeller = (updates: {
  name: string
  lastName: string
  phoneNumber: number
  shopSlug: string
  description: string
  address: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
    zipCode: number
  }
}): RequestReturnType<ApiSeller> => {
  return request.patch('/user/seller/me')
}
