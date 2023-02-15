import { Schema } from 'mongoose'
import { discriminatorKey } from '../user.schema'
import { CustomerModel, ICustomer, ICustomerMethods } from './customer.model'

const CustomerSchema = new Schema<ICustomer, CustomerModel, ICustomerMethods>(
  {
    balance: {
      type: Number,
      required: true,
      set: function (value: number) {
        return Math.trunc(value)
      },
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
      required: false,
    },
    cart: {
      type: [
        {
          storageItem: {
            type: Schema.Types.ObjectId,
            ref: 'StorageItem',
            required: true,
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
      maxlength: 20,
    },
  },
  { discriminatorKey }
)

export default CustomerSchema
