import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import {
  ApiCategory,
  ApiFeature,
  ApiProduct,
  ApiLeafCategory,
} from '../entities'
import { FormLeafCategory } from '../forms'

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
