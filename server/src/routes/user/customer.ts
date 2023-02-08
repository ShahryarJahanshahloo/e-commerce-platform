import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as CustomerService from '../../services/user/customer.service'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const customer = await CustomerService.create(req.body)
    res.status(201).send(customer)
  } catch (error) {
    res.status(400).send()
  }
})

router.get('/me', auth([userRoles.Customer]), async (req, res) => {
  try {
    const customer = await CustomerService.findById(req.user.id)
    res.send(customer)
  } catch (error) {
    res.status(500).send()
  }
})

router.put('/cart', auth([userRoles.Customer]), async (req, res) => {
  try {
    const customer = await CustomerService.addToCart(
      req.user.id,
      req.body.storageItem,
      req.body.quantity
    )
    res.status(201).send(customer.cart)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete(
  '/cart/:storageItemId',
  auth([userRoles.Customer]),
  async (req, res) => {
    try {
      const customer = await CustomerService.removeFromCart(
        req.user.id,
        req.params.storageItemId
      )
      res.send(customer.cart)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch('/me', auth([userRoles.Customer]), async (req, res) => {
  try {
    const customer = await CustomerService.findAndUpdate(
      req.params.customerId,
      req.body
    )
    res.send(customer)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
