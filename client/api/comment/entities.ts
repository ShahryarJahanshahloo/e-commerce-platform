import { HasId } from '../entities.common'

export type ApiComment = {
  product: string
  customer: string
  text: string
  votes: {
    user: string
    value: number
  }[]
} & HasId
