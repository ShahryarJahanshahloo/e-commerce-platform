export enum userRoles {
  Admin = 'Admin',
  Seller = 'Seller',
  Customer = 'Customer',
}

export type ApiUser = {
  _id: string
  name: string
  lastName: string
  role: userRoles
}

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

export type FormSignInCreds = {
  email: string
  password: string
}

export type FormSellerVote = {
  value: number
}
