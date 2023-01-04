import express, { Router, Request, Response } from 'express'
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

const router: Router = express.Router()

export default router
