import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as SellerService from '../../services/user/seller.service'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const seller = await SellerService.create(req.body)
    res.status(201).send(seller)
  } catch (error) {
    res.status(400).send()
  }
})

router.put('/:sellerId/rate', auth([userRoles.Customer]), async (req, res) => {
  try {
    const seller = await SellerService.rate(
      req.params.sellerId,
      req.body.value,
      req.user.id
    )
    res.status(201).send(seller)
  } catch (error) {
    res.status(400).send()
  }
})

router.delete(
  '/:sellerId/rate',
  auth([userRoles.Customer]),
  async (req, res) => {
    try {
      const seller = await SellerService.removeRate(
        req.params.sellerId,
        req.user.id
      )
      res.send(seller)
    } catch (error) {
      res.status(400).send()
    }
  }
)

router.get('/me', auth([userRoles.Seller]), async (req, res) => {
  try {
    const seller = await SellerService.findById(req.user.id)
    res.send(seller)
  } catch (error) {
    res.status(400).send()
  }
})

router.patch('/me', auth([userRoles.Seller]), async (req, res) => {
  try {
    const seller = await SellerService.findAndUpdate(req.user.id, req.body)
    res.send(seller)
  } catch (error) {
    res.status(500).send()
  }
})

export default router
