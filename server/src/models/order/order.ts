import { Schema, model, Model } from 'mongoose'

export enum orderStates {
  Pending = 'Pending',
  Canceled = 'Canceled',
  Paid = 'Paid',
  Shipped = 'Shipped',
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
}
interface IOrderMethods {}
interface OrderModel extends Model<IOrder, {}, IOrderMethods> {}

const OrderSchema = new Schema<IOrder, OrderModel, IOrderMethods>(
  {
    items: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
          },
          seller: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User' /*needs seller-only filter*/,
          },
          price: {
            type: Number,
            required: true,
            set: function (value: number) {
              return Math.trunc(value)
            },
          },
          quantity: {
            type: Number,
            required: true,
            set: function (value: number) {
              return Math.trunc(value)
            },
          },
        },
      ],
    },
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', //needs only-customer filter
    },
    state: {
      type: String,
      enum: orderStates,
    },
  },
  { timestamps: true }
)

const Order = model<IOrder, OrderModel>('Order', OrderSchema)
export default Order
