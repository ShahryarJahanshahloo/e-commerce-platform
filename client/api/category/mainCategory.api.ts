import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { ApiCategory, ApiMainCategory } from '../entities'
import { FormMainCategory } from '../forms'

export const CreateMainCategory = (
  category: FormMainCategory
): RequestReturnType<ApiMainCategory> => {
  return request.post('/category/main/', { ...category })
}

export const GetMainCategories = (): RequestReturnType<ApiCategory[]> => {
  return request.get('/category/main')
}

export const GetChildren = (id: string): RequestReturnType<ApiCategory[]> => {
  return request.get(`/category/main/${id}/children`)
}

export const UpdateMainCategory = (
  categoryId: string,
  updates: {
    name: string
  }
): RequestReturnType<ApiMainCategory> => {
  return request.patch('/category/main/' + categoryId, { ...updates })
}
