import { RequestReturnType } from '../axios'
import request from '../axios'
import { ApiProduct, ApiProductPublic, FormProduct } from './product.entities'

export const CreateProduct = (
  product: FormProduct
): RequestReturnType<ApiProduct> => {
  return request.post('/product', { ...product })
}

export const GetProduct = (
  productId: string
): RequestReturnType<ApiProductPublic> => {
  return request.get(`/product/${productId}`)
}

export const UpdateProduct = (
  productId: string,
  updates: {
    name: string
    description: string
    featureValues: any[]
  }
): RequestReturnType<ApiProduct> => {
  return request.patch('/product/' + productId, { ...updates })
}

export const ApproveProduct = (
  productId: string
): RequestReturnType<ApiProduct> => {
  return request.patch('/product/' + productId + '/approve')
}

export const DisapproveProduct = (
  productId: string
): RequestReturnType<ApiProduct> => {
  return request.patch('/product/' + productId + '/disapprove')
}

export const ActivateProduct = (
  productId: string
): RequestReturnType<ApiProduct> => {
  return request.patch('/product/' + productId + '/activate')
}

export const DeactivateProduct = (
  productId: string
): RequestReturnType<ApiProduct> => {
  return request.patch('/product/' + productId + '/deactivate')
}

export const GetProductsByCategory = (
  categoryId: string,
  options: any
): RequestReturnType<ApiProduct[]> => {
  return request.get(`/product/category/${categoryId}`)
}

export const SearchProducts = (
  query: string
): RequestReturnType<ApiProduct[]> => {
  return request.get(`/product/search?query=` + query)
}

export const RateProduct = (
  productId: string,
  rate: { value: string }
): RequestReturnType<{}> => {
  return request.put('/product/' + productId + '/rate', { ...rate })
}

export const UnrateProduct = (productId: string): RequestReturnType<{}> => {
  return request.delete('/product/' + productId + '/rate')
}

export const GetAllIds = (): RequestReturnType<{ _id: string }[]> => {
  return request.get('/product')
}
