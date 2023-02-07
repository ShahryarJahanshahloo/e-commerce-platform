import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import Order, { IOrder, orderStates } from '../../models/order/order.model'
import axios from 'axios'
import Seller from '../../models/user/seller/seller.model'
import Shipment, { shipmentStates } from '../../models/shipment/shipment.model'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Seller, userRoles.Admin]),
  async (req, res) => {
    try {
      const order = new Order(req.body)
      await order.save()
      res.status(201).send(order)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

router.get('/callback', async (req, res) => {
  try {
    const checkoutResult = await axios.post(
      'https://gateway.zibal.ir/v1/verify',
      {
        merchant: 'zibal',
        trackId: req.query.trackId,
      }
    )
    if (checkoutResult.data.status != 1) return res.status(400).send()

    const order = await Order.findById(checkoutResult.data.orderId)
    if (order === null) return res.status(400).send()
    order.state = orderStates.Paid
    //needs transaction
    await order.save()
    order.items.forEach(async item => {
      const seller = await Seller.findById(item.seller)
      if (seller === null) throw new Error()
      seller.balance += item.price * item.quantity
      await seller.save()
    })
    const sellers = new Set()
    order.items.forEach(item => {
      sellers.add(item.seller)
    })
    sellers.forEach(async seller => {
      const shipment = new Shipment({
        order: order.id,
        seller: seller,
        state: shipmentStates.Pending,
      })
      await shipment.save()
    })
    res.send()
  } catch (error) {
    res.send(error)
  }
})

router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
    if (order === null) return res.status(400).send()
    res.send(order)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/customer/:orderId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.orderId })
    res.send(orders)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/customer/me', auth([userRoles.Customer]), async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
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
      const order = await Order.findOne({
        _id: req.params.orderId,
        customer: req.user.id,
      })
      if (order === null) return res.status(400).send()
      order.state = orderStates.Canceled
      await order.save()
      res.send(order)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

//  'https://gateway.zibal.ir/start/{{trackId}}'
router.post(
  '/:orderId/checkout',
  auth([userRoles.Customer]),
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId)
      if (order === null) return res.status(400).send()
      if (order.state !== orderStates.Pending) return res.status(400).send()
      const result = await axios.post('https://gateway.zibal.ir/v1/request', {
        merchant: 'zibal',
        amount: order.total,
        callbackUrl: 'http://localhost:3001/order/callback',
        orderId: order.id,
      })
      res.send(result.data)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

export default router
