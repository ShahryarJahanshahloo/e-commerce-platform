import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as OrderService from '../../services/order/order.service'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Seller, userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const order = await OrderService.create(req.body)
    res.status(201).send(order)
  })
)

router.get(
  '/callback',
  asyncHandler(async (req, res) => {
    const order = OrderService.finalizeOrder(req.query.trackId)
    res.send(order)
  })
)

router.get(
  '/:orderId',
  asyncHandler(async (req, res) => {
    const order = await OrderService.findById(req.params.orderId)
    res.send(order)
  })
)

router.get(
  '/customer/:orderId',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const orders = await OrderService.getCustomerOrders(req.params.orderId)
    res.send(orders)
  })
)

router.get(
  '/customer/me',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const orders = await OrderService.getMyOrders(req.user.id)
    res.send(orders)
  })
)

router.patch(
  '/:orderId/cancel',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const order = await OrderService.cancelOrder(
      req.params.orderId,
      req.user.id
    )
    res.send(order)
  })
)

router.post(
  '/:orderId/checkout',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const gatewayLink = await OrderService.checkout(req.params.orderId)
    res.send(gatewayLink)
  })
)

export default router
