import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { ApiCategory, ApiProduct } from '../entities'

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
