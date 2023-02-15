export type ApiCartItem = {
  storageItem: {
    _id: string
    price: number
    product: {
      _id: string
      name: string
    }
  }
  quantity: number
}

export type FormCartItem = {
  storageItem: string
  quantity: number
}
