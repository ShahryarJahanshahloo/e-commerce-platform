export type ApiOrder = {
  _id: string
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
}

export type FormOrder = {
  items: {
    product: string
    seller: string
    price: number
    quantity: number
  }[]
  customer: string
  address: {
    description: string
    coordinates?: {
      lat: number
      lon: number
    }
    zipCode: number
  }
}
