import Feature from '../../models/feature/feature.model'
import { updateByValidKeys } from '../../utils/common'

export const create = async (body: any) => {
  const feature = new Feature(body)
  await feature.save()
  return feature
}

export const findById = async (featureId: any) => {
  const feature = await Feature.findById(featureId)
  if (feature === null) throw new Error()
  return feature
}

export const findAndUpdate = async (featureId: any, updates: any) => {
  const feature = await Feature.findById(featureId)
  if (feature === null) throw new Error()
  await updateByValidKeys(feature, updates, ['label'])
  return feature
}
