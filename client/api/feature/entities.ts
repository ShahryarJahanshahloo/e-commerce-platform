import { HasId } from '../entities.common'

export type ApiFeature = {
  label: string
  category: string
  values: string[]
} & HasId

export type ApiFeatureValue = {
  value: string
  feature: string
  products: string[]
} & HasId
