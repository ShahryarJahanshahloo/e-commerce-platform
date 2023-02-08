import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as StorageItemService from '../../services/storageItem/storageItem.service'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Seller]),
  asyncHandler(async (req, res) => {
    const storageItem = await StorageItemService.create(req.body, req.user.id)
    res.status(201).send(storageItem)
  })
)

router.get(
  '/seller/:sellerId/report',
  auth([userRoles.Seller]),
  asyncHandler(async (req, res) => {
    const products = await StorageItemService.findBySellerId(
      req.params.sellerId
    )
    res.send(products)
  })
)

router.patch(
  '/:storageItemID',
  auth([userRoles.Seller]),
  asyncHandler(async (req, res) => {
    const storageItem = await StorageItemService.findAndUpdate(
      req.params.storageItemID,
      req.body
    )
    res.send(storageItem)
  })
)

export default router
