import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { ApiMiddleCategory, ApiProduct } from '../entities'
import { FormMiddleCategory } from '../forms'

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
