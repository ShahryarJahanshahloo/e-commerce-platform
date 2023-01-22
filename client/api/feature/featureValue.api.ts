import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { ApiFeatureValue, ApiProduct } from '../entities'
import { FormFeatureValue } from '../forms'

export const CreateFeatureValue = (
  featureValue: FormFeatureValue
): RequestReturnType<ApiFeatureValue> => {
  return request.post('/feature/value/', { ...featureValue })
}

export const GetFeatureValue = (
  featureValueId: string
): RequestReturnType<ApiFeatureValue> => {
  return request.get('/feature/value' + featureValueId)
}

export const UpdateFeatureValue = (
  featureValueId: string,
  updates: {
    value: number
  }
): RequestReturnType<ApiFeatureValue> => {
  return request.patch('/feature/value/' + featureValueId, { ...updates })
}
