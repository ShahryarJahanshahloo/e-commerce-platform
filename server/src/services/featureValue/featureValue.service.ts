import FeatureValue from '../../models/featureValue/featureValue.model'
import { updateByValidKeys } from '../../utils/common'

export const create = async (body: any) => {
  const featureValue = new FeatureValue(body)
  await featureValue.save()
  return featureValue
}

export const findById = async (featureId: any) => {
  const featureValue = await FeatureValue.findById(featureId)
  if (featureValue === null) throw new Error()
  return featureValue
}

export const findAndUpdate = async (featureId: any, updates: any) => {
  const featureValue = await FeatureValue.findById(featureId)
  if (featureValue === null) throw new Error()
  await updateByValidKeys(featureValue, updates, ['value'])
  return featureValue
}
