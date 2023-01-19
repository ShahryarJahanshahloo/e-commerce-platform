import { Schema, model, Model } from 'mongoose'
import Seller from '../user/seller'

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
interface IShipmentMethods {}
interface ShipmentModel extends Model<IShipment, {}, IShipmentMethods> {}

const ShipmentSchema = new Schema<IShipment, ShipmentModel, IShipmentMethods>(
  {
    order: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Order',
    },
    seller: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    state: {
      type: String,
      required: true,
      enum: shipmentStates,
    },
  },
  {}
)

ShipmentSchema.pre('validate', async function () {
  if (this.isNew) {
    this.state = shipmentStates.Pending

    const seller = await Seller.findById(this.seller)
    if (seller === null) throw new Error('invalid seller')
  }
})

const Shipment = model<IShipment, ShipmentModel>('Shipment', ShipmentSchema)
export default Shipment
