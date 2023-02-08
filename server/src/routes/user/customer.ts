import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as CustomerService from '../../services/user/customer.service'

const router = express.Router()

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const customer = await CustomerService.create(req.body)
    res.status(201).send(customer)
  })
)

router.get(
  '/me',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const customer = await CustomerService.findById(req.user.id)
    res.send(customer)
  })
)

router.patch(
  '/me',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const customer = await CustomerService.findAndUpdate(
      req.params.customerId,
      req.body
    )
    res.send(customer)
  })
)

router.put(
  '/cart',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const customer = await CustomerService.addToCart(
      req.user.id,
      req.body.storageItem,
      req.body.quantity
    )
    res.status(201).send(customer.cart)
  })
)

router.delete(
  '/cart/:storageItemId',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const customer = await CustomerService.removeFromCart(
      req.user.id,
      req.params.storageItemId
    )
    res.send(customer.cart)
  })
)

export default router
