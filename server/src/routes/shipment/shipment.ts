import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import Shipment, {
  IShipment,
  shipmentStates,
} from '../../models/shipment/shipment.model'

const router = express.Router()

export default router
