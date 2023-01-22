import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { ApiFeature, ApiProduct } from '../entities'
import { FormFeature } from '../forms'

export const CreateFeature = (
  feature: FormFeature
): RequestReturnType<ApiFeature> => {
  return request.post('/feature', { ...feature })
}

export const GetFeature = (
  featureId: string
): RequestReturnType<ApiFeature> => {
  return request.get('/feature/' + featureId)
}

export const UpdateFeature = (
  featureId: string,
  updates: {
    label: string
  }
): RequestReturnType<ApiFeature> => {
  return request.patch('/feature/' + featureId, { ...updates })
}
