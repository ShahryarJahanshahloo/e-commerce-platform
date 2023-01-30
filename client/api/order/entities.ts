import { HasId } from '../entities.common'

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
