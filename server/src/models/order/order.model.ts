import { Schema, model, Model } from 'mongoose'
import OrderSchema from './order.schema'
import Customer from '../user/customer/customer.model'
import Seller from '../user/seller/seller.model'

export enum orderStates {
  Pending = 'Pending',
  Canceled = 'Canceled',
  Paid = 'Paid',
}

export interface IOrder {
  items: {
    product: Schema.Types.ObjectId
    seller: Schema.Types.ObjectId
    price: number
    quantity: number
  }[]
  customer: Schema.Types.ObjectId
  state: orderStates
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
export interface IOrderMethods {}
export interface OrderModel extends Model<IOrder, {}, IOrderMethods> {}

OrderSchema.pre('validate', async function (next) {
  if (this.isNew) {
    this.state = orderStates.Pending

    const customer = await Customer.findById(this.customer)
    if (customer === null) throw new Error('customer not found')

    const sellers = new Set()
    this.items.forEach(item => {
      sellers.add(item.seller)
    })
    sellers.forEach(async sellerId => {
      const seller = await Seller.findById(sellerId)
      if (seller === null) throw new Error('invalid seller')
    })
  }

  next()
})

const Order = model<IOrder, OrderModel>('Order', OrderSchema)
export default Order
