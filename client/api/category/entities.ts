import { HasId } from '../entities.common'

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
