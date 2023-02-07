import express from 'express'
import Customer, { ICustomer } from '../../models/user/customer/customer.model'
import { userRoles } from '../../models/user/user.model'
import auth from '../../middlewares/auth'
import { Schema } from 'mongoose'
import { updateByValidKeys } from '../../utils/common'

const router = express.Router()

router.post('/', async (req, res) => {
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

router.get('/me', auth([userRoles.Customer]), async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id)
    if (customer == null) return res.status(400).send()
    res.send(customer)
  } catch (error) {
    res.status(500).send()
  }
})

router.put('/cart', auth([userRoles.Customer]), async (req, res) => {
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
})

router.delete(
  '/cart/:storageItemId',
  auth([userRoles.Customer]),
  async (req, res) => {
    try {
      const customer = await Customer.findById(req.user.id)
      if (customer === null) return res.status(400).send()
      customer.cart.filter(cartItem => {
        return cartItem.storageItem.toString() !== req.params.storageItemId
      })
      await customer.save()
      res.send(customer.cart)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch('/me', auth([userRoles.Customer]), async (req, res) => {
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
})

export default router
