import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { ApiCategory } from '../entities'

export const GetMainCategories = (): RequestReturnType<ApiCategory[]> => {
  return request.get('/category/main')
}

export const GetChildren = (id: string): RequestReturnType<ApiCategory[]> => {
  return request.get(`/category/${id}/children`)
}
