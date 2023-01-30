import { HasId } from '../entities.common'

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
