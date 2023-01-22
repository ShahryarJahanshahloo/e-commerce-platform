type FormUser = {
  name: string
  lastName?: string
  email: string
  phoneNumber?: number
  password: string
}

export type FormAdmin = {} & FormUser

export type FormSeller = {
  shopSlug?: string
  description?: string
  account: number
  rate: number
  address: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
    zipCode: number
  }
} & FormUser

export type FormCustomer = {
  address?: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
    zipCode: number
  }
} & FormUser

export type FormCartItem = {
  storageItem: string
  quantity: number
}

export type FormSignInCreds = {
  email: string
  password: string
}

export type FormLeafCategory = {
  name: string
  parent: string
}

export type FormMiddleCategory = {
  name: string
  parent: string
}

export type FormMainCategory = {
  name: string
}

export type FormComment = {
  product: string
  customer: string
  text: string
}

export type FormCommentVote = {
  value: number
}

export type FormSellerVote = {
  value: number
}

export type FormFeature = {
  label: string
  category: string
}

export type FormFeatureValue = {
  value: string
  feature: string
}

export type FormOrder = {
  items: {
    product: string
    seller: string
    price: number
    quantity: number
  }[]
  customer: string
  address: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
    zipCode: number
  }
}

export type FormProduct = {
  name: string
  description?: string
  category: string
  featureValues: string[]
}

export type FormStorageItem = {
  product: string
  seller: string
  quantity: number
  price: number
}
