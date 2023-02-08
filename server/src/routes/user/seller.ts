import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as SellerService from '../../services/user/seller.service'

const router = express.Router()

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const seller = await SellerService.create(req.body)
    res.status(201).send(seller)
  })
)

router.put(
  '/:sellerId/rate',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const seller = await SellerService.rate(
      req.params.sellerId,
      req.body.value,
      req.user.id
    )
    res.status(201).send(seller)
  })
)

router.delete(
  '/:sellerId/rate',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const seller = await SellerService.removeRate(
      req.params.sellerId,
      req.user.id
    )
    res.send(seller)
  })
)

router.get(
  '/me',
  auth([userRoles.Seller]),
  asyncHandler(async (req, res) => {
    const seller = await SellerService.findById(req.user.id)
    res.send(seller)
  })
)

router.patch(
  '/me',
  auth([userRoles.Seller]),
  asyncHandler(async (req, res) => {
    const seller = await SellerService.findAndUpdate(req.user.id, req.body)
    res.send(seller)
  })
)

export default router
