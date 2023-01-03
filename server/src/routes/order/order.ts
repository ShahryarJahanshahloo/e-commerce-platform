import express, { Router, Request, Response } from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'
import {
  TypedRequestBody,
  TypedRequestBodyWithParams,
} from '../../TypedRequestBody'
import { updateByValidKeys } from '../../utils/common'
import Order, { IOrder, orderStates } from '../../models/order/order'

const router: Router = express.Router()

//change state to paid or shipped

router.post(
  '/',
  auth([userRoles.Seller, userRoles.Admin]),
  async (req: TypedRequestBody<IOrder>, res: Response) => {
    try {
      const order = new Order(req.body)
      await order.save()
      res.status(201).send(order)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
    if (order === null) return res.status(400).send()
    res.send(order)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get(
  '/customer/:id',
  auth([userRoles.Admin]),
  async (req: Request, res: Response) => {
    try {
      const orders = await Order.find({ customer: req.params.id })
      res.send(orders)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.get(
  '/customer/me',
  auth([userRoles.Customer]),
  async (req: Request, res: Response) => {
    try {
      const orders = await Order.find({ customer: req.user.id })
      res.send(orders)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch(
  '/:id/cancel',
  auth([userRoles.Customer]),
  async (
    req: TypedRequestBodyWithParams<IOrder, { id: string }>,
    res: Response
  ) => {
    try {
      const order = await Order.findOne({
        _id: req.params.id,
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

export default router
