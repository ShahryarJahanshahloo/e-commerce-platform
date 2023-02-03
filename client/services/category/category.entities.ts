export type ApiCategory = {
  _id: string
  type: string
  name: string
  isActive: boolean
}

export type ApiMainCategory = {} & ApiCategory

export type ApiLeafCategory = {
  parent: string
} & ApiCategory

export type ApiMiddleCategory = {
  parent: string
} & ApiCategory

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
