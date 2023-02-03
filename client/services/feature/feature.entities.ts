export type ApiFeature = {
  _id: string
  label: string
  category: string
  values: string[]
}

export type ApiFeatureValue = {
  _id: string
  value: string
  feature: string
  products: string[]
}

export type FormFeature = {
  label: string
  category: string
}

export type FormFeatureValue = {
  value: string
  feature: string
}
