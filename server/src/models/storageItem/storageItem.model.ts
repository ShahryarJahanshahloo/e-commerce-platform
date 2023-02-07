import { Schema, model, Model } from 'mongoose'
import Seller from '../user/seller/seller.model'
import StorageItemSchema from './storageItem.schema'

export interface IStorageItem {
  product: Schema.Types.ObjectId
  seller: Schema.Types.ObjectId
  quantity: number
  price: number
  sold: number
}
export interface IStorageItemMethods {}
export interface StorageItemModel
  extends Model<IStorageItem, {}, IStorageItemMethods> {}

StorageItemSchema.pre('validate', async function (next) {
  if (this.isNew) {
    this.sold = 0
  }

  const seller = await Seller.findById(this.seller)
  if (seller === null) throw new Error('seller not found')
  next()
})

const StorageItem = model<IStorageItem, StorageItemModel>(
  'StorageItem',
  StorageItemSchema
)
export default StorageItem
