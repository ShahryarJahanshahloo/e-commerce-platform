import express, { Router, Request, Response } from 'express'
import Customer, { ICustomer } from '../../models/user/customer'
import {
  TypedRequestBody,
  TypedRequestBodyWithParams,
} from '../../TypedRequestBody'
import { userRoles } from '../../models/user/user'
import auth from '../../middlewares/auth'
import { Schema } from 'mongoose'
import { updateByValidKeys } from '../../utils/common'

const router: Router = express.Router()

router.post('/', async (req: TypedRequestBody<ICustomer>, res: Response) => {
  try {
    const customer = new Customer(req.body)
    await customer.save()
    await customer.generateAccessToken()
    res.status(201).send(customer)
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'invalid request' })
  }
})

router.put(
  '/cart',
  auth([userRoles.Customer]),
  async (
    req: TypedRequestBody<{
      storageItem: Schema.Types.ObjectId
      quantity: number
    }>,
    res: Response
  ) => {
    try {
      const customer = await Customer.findById(req.user.id)
      if (customer === null) return res.status(400).send()
      for (const cartItem of customer.cart) {
        if (cartItem.storageItem === req.body.storageItem) {
          cartItem.quantity = req.body.quantity
          await customer.save()
          return res.send()
        }
      }
      customer.cart.push({
        storageItem: req.body.storageItem,
        quantity: req.body.quantity,
      })
      await customer.save()
      res.status(201).send(customer.cart)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.delete(
  '/cart',
  auth([userRoles.Customer]),
  async (
    req: TypedRequestBody<{
      storageItem: Schema.Types.ObjectId
    }>,
    res: Response
  ) => {
    try {
      const customer = await Customer.findById(req.user.id)
      if (customer === null) return res.status(400).send()
      customer.cart.filter(cartItem => {
        return cartItem.storageItem !== req.body.storageItem
      })
      await customer.save()
      res.send(customer.cart)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch(
  '/:customerId',
  auth([userRoles.Customer]),
  async (
    req: TypedRequestBodyWithParams<ICustomer, { customerId: string }>,
    res: Response
  ) => {
    try {
      const customer = await Customer.findById(req.params.customerId)
      if (customer === null) return res.status(400).send()
      await updateByValidKeys(customer, req.body, [
        'name',
        'lastName',
        'phoneNumber',
        'address',
      ])
      res.send(customer)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

export default router
