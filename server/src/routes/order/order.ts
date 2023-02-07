import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as OrderService from '../../services/order/order.service'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Seller, userRoles.Admin]),
  async (req, res) => {
    try {
      const order = await OrderService.create(req.body)
      res.status(201).send(order)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

router.get('/callback', async (req, res) => {
  try {
    const order = OrderService.finalizeOrder(req.query.trackId)
    res.send(order)
  } catch (error) {
    res.send(error)
  }
})

router.get('/:orderId', async (req, res) => {
  try {
    const order = await OrderService.findById(req.params.orderId)
    res.send(order)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/customer/:orderId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const orders = await OrderService.getCustomerOrders(req.params.orderId)
    res.send(orders)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/customer/me', auth([userRoles.Customer]), async (req, res) => {
  try {
    const orders = await OrderService.getMyOrders(req.user.id)
    res.send(orders)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch(
  '/:orderId/cancel',
  auth([userRoles.Customer]),
  async (req, res) => {
    try {
      const order = await OrderService.cancelOrder(
        req.params.orderId,
        req.user.id
      )
      res.send(order)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.post(
  '/:orderId/checkout',
  auth([userRoles.Customer]),
  async (req, res) => {
    try {
      const gatewayLink = await OrderService.checkout(req.params.orderId)
      res.send(gatewayLink)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

export default router
