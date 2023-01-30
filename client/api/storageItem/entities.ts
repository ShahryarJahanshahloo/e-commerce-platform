import { HasId } from '../entities.common'

export type ApiStorageItem = {
  product: string
  seller: string
  quantity: number
  price: number
  sold: number
} & HasId
