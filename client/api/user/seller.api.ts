import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { ApiProduct, ApiSeller } from '../entities'
import { FormSeller, FormSellerVote } from '../forms'

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

export const GetMe = (): RequestReturnType<ApiSeller> => {
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
