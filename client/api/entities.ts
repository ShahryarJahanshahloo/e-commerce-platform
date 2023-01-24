export type HasId = {
  _id: string
}

export type ApiUser = {
  name: string
  lastName: string
} & HasId

export type ApiCustomer = {
  balance: number
  address?: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
    zipCode: number
  }
  cart: {
    storageItem: string
    quantity: number
  }[]
} & ApiUser

export type ApiSeller = {
  shopSlug?: string
  description?: string
  balance: number
  account: number
  ratings: {
    customer: string
    value: number
  }[]
  rate: number
  address: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
    zipCode: number
  }
} & ApiUser

export type ApiAdmin = {} & ApiUser

export type ApiCategory = {
  type: string
  name: string
  isActive: boolean
} & HasId

export type ApiMainCategory = {} & ApiCategory

export type ApiLeafCategory = {
  parent: string
} & ApiCategory

export type ApiMiddleCategory = {
  parent: string
} & ApiCategory

export type ApiProduct = {
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
} & HasId

export type ApiProductCart = {
  name: string
  price: number
  rate: number
} & HasId

export type ApiComment = {
  product: string
  customer: string
  text: string
  votes: {
    user: string
    value: number
  }[]
} & HasId

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

export type ApiOrder = {
  items: {
    product: string
    seller: string
    price: number
    quantity: number
  }[]
  customer: string
  state: string
  address: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
    zipCode: number
  }
  total: number
} & HasId

export type ApiShipment = {
  order: string
  seller: string
  state: string
} & HasId

export type ApiStorageItem = {
  product: string
  seller: string
  quantity: number
  price: number
  sold: number
} & HasId

export type ApiCartItem = {
  storageItem: string
  quantity: number
  price: number
  name: string
}

export type ApiSellerListItem = {
  storageItem: string
  quantity: number
  price: number
  sellerName: string
  sellerRate: number
}
