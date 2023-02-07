import { Schema } from 'mongoose'
import { IOrder, IOrderMethods, OrderModel, orderStates } from './order.model'

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
            min: 1,
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
      ref: 'User',
    },
    state: {
      type: String,
      required: true,
      enum: orderStates,
    },
    address: {
      type: {
        description: {
          type: String,
          required: true,
          maxLength: 511,
        },
        coordinates: {
          type: {
            lat: {
              type: Number,
              required: true,
            },
            lon: {
              type: Number,
              required: true,
            },
          },
          required: false,
        },
        zipCode: {
          type: Number,
          minlength: 10,
          maxlength: 10,
          set: function (value: number) {
            return Math.trunc(value)
          },
        },
      },
      required: true,
    },
  },
  { timestamps: true }
)

OrderSchema.virtual('total').get(function (this) {
  let total = 0
  this.items.forEach(item => {
    total += item.price * item.quantity
  })
  return total
})

export default OrderSchema
