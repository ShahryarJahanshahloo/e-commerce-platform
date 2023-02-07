import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as StorageItemService from '../../services/storageItem/storageItem.service'

const router = express.Router()

router.post('/', auth([userRoles.Seller]), async (req, res) => {
  try {
    const storageItem = await StorageItemService.create(req.body, req.user.id)
    res.status(201).send(storageItem)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/:storageItemID', auth([userRoles.Seller]), async (req, res) => {
  try {
    const storageItem = await StorageItemService.findAndUpdate(
      req.params.storageItemID,
      req.body
    )
    res.send(storageItem)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get(
  '/seller/:sellerId/report',
  auth([userRoles.Seller]),
  async (req, res) => {
    try {
      const products = await StorageItemService.findBySellerId(
        req.params.sellerId
      )
      res.send(products)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

export default router
