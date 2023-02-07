import { Schema, model, Model } from 'mongoose'
import Seller from '../user/seller/seller.model'
import ShipmentSchema from './shipment.schema'

export enum shipmentStates {
  Pending = 'Pending',
  Sent = 'Sent',
  Delivered = 'Delivered',
  Canceled = 'Canceled',
}

export interface IShipment {
  order: Schema.Types.ObjectId
  seller: Schema.Types.ObjectId
  state: shipmentStates
}
export interface IShipmentMethods {}
export interface ShipmentModel extends Model<IShipment, {}, IShipmentMethods> {}

ShipmentSchema.pre('validate', async function () {
  if (this.isNew) {
    this.state = shipmentStates.Pending

    const seller = await Seller.findById(this.seller)
    if (seller === null) throw new Error('invalid seller')
  }
})

const Shipment = model<IShipment, ShipmentModel>('Shipment', ShipmentSchema)
export default Shipment
