export type ApiProduct = {
  _id: string
  name: string
  description?: string
  category: string
  isApproved: boolean
  isActive: boolean
  views: number
  featureValues: string[]
  ratings: {
    customer: string
    value: number
  }[]
  sold: number
}

export type ApiProductPublic = {
  _id: string
  name: string
  description?: string
  category: string
  views: number
  features: string[]
  sold: number
  price: number
}

export type ApiProductCart = {
  _id: string
  name: string
  price: number
  rate: number
}

export type FormProduct = {
  name: string
  description?: string
  category: string
  featureValues: string[]
}
