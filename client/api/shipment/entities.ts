import { HasId } from '../entities.common'

export type ApiShipment = {
  order: string
  seller: string
  state: string
} & HasId
