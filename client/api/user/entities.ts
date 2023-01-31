import { HasId } from '../entities.common'

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

export type ApiCartItem = {
  storageItem: string
  quantity: number
  price: number
  productId: string
  productName: string
}
