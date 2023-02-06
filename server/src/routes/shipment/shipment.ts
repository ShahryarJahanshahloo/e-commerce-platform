import express from 'express'
import {
  TypedRequestBody,
  TypedRequestBodyWithParams,
} from '../../TypedRequestBody'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'
import Shipment, {
  IShipment,
  shipmentStates,
} from '../../models/shipment/shipment'

const router = express.Router()

export default router
