import { Schema } from 'mongoose'
import {
  IShipment,
  IShipmentMethods,
  ShipmentModel,
  shipmentStates,
} from './shipment.model'

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

export default ShipmentSchema
