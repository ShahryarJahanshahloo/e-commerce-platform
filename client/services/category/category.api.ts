import { RequestReturnType } from '../axios'
import request from '../axios'
import { ApiFeature } from '../feature/feature.entities'
import {
  ApiCategory,
  ApiLeafCategory,
  ApiMainCategory,
  ApiMiddleCategory,
  FormLeafCategory,
  FormMainCategory,
  FormMiddleCategory,
} from './category.entities'

export const GetCategory = (
  categoryId: string
): RequestReturnType<ApiCategory> => {
  return request.get('/category/' + categoryId)
}

export const ActivateCategory = (categoryId: string): RequestReturnType<{}> => {
  return request.post('/category/' + categoryId + '/activate')
}

export const DeactivateCategory = (
  categoryId: string
): RequestReturnType<{}> => {
  return request.post('/category/' + categoryId + '/deactivate')
}

export const CreateLeafCategory = (
  category: FormLeafCategory
): RequestReturnType<ApiLeafCategory> => {
  return request.post('/category/leaf', { ...category })
}

export const GetLeafCategoryFeatures = (
  categoryId: string
): RequestReturnType<ApiFeature[]> => {
  return request.get('/category/leaf/' + categoryId + '/features')
}

export const UpdateLeafCategory = (
  categoryId: string,
  updates: {
    name: string
    parent: string
  }
): RequestReturnType<ApiCategory> => {
  return request.patch('/category/leaf/' + categoryId, { ...updates })
}

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

export const CreateMiddleCategory = (
  category: FormMiddleCategory
): RequestReturnType<ApiMiddleCategory> => {
  return request.post('/category/middle/', { ...category })
}

export const UpdateMiddleCategory = (
  categoryId: string,
  updates: {}
): RequestReturnType<ApiMiddleCategory> => {
  return request.patch('/category/middle/' + categoryId, { ...updates })
}
