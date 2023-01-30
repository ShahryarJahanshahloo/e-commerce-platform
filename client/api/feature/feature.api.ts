import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { FormFeature, FormFeatureValue } from '../forms'
import { ApiFeature, ApiFeatureValue } from './entities'

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
