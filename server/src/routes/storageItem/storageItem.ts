import express, { Router, Request, Response } from 'express'
import auth from '../../middlewares/auth'
import {
  TypedRequestBody,
  TypedRequestBodyWithParams,
} from '../../TypedRequestBody'
import { userRoles } from '../../models/user/user'
import { updateByValidKeys } from '../../utils/common'
import StorageItem, { IStorageItem } from '../../models/storageItem/storageItem'

const router: Router = express.Router()

router.post(
  '/',
  auth([userRoles.Seller]),
  async (req: TypedRequestBody<IStorageItem>, res: Response) => {
    try {
      req.body.seller = req.user.id
      const storageItem = new StorageItem(req.body)
      await storageItem.save()
      res.status(201).send(storageItem)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

router.patch(
  '/:storageItemID',
  auth([userRoles.Seller]),
  async (
    req: TypedRequestBodyWithParams<IStorageItem, { storageItemID: string }>,
    res: Response
  ) => {
    try {
      const storageItem = await StorageItem.findById(req.params.storageItemID)
      if (storageItem === null) return res.status(400).send()
      await updateByValidKeys(storageItem, req.body, ['price', 'quantity'])
      res.send(storageItem)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.get(
  '/seller/:sellerId/report',
  auth([userRoles.Seller]),
  async (req: Request, res: Response) => {
    try {
      const products = await StorageItem.find({ seller: req.params.sellerId })
      res.send(products)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

export default router
