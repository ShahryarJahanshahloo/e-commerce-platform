import { Schema } from 'mongoose'
import {
  IStorageItem,
  IStorageItemMethods,
  StorageItemModel,
} from './storageItem.model'

const StorageItemSchema = new Schema<
  IStorageItem,
  StorageItemModel,
  IStorageItemMethods
>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      set: function (value: number) {
        return Math.trunc(value)
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      set: function (value: number) {
        return Math.trunc(value)
      },
    },
    sold: {
      type: Number,
      required: true,
    },
  },
  {}
)

export default StorageItemSchema
