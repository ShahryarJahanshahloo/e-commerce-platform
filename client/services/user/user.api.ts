import { RequestReturnType } from '../axios'
import request from '../axios'
import {
  ApiAdmin,
  ApiCustomer,
  ApiSeller,
  ApiUser,
  FormAdmin,
  FormCustomer,
  FormSeller,
  FormSellerVote,
  FormSignInCreds,
} from './user.entities'

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

export const Authenticate = (): RequestReturnType<ApiUser> => {
  return request.post('/user/authenticate')
}
