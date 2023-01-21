export type HasId = {
  _id: string
}

export type ApiUser = {
  name: string
  lastName: string
} & HasId

export type ApiCustomer = {} & ApiUser

export type ApiCategory = {
  type: string
  name: string
  isActive: boolean
} & HasId
