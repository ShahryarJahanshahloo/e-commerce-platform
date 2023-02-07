import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import { updateByValidKeys } from '../../utils/common'
import StorageItem, {
  IStorageItem,
} from '../../models/storageItem/storageItem.model'

const router = express.Router()

router.post('/', auth([userRoles.Seller]), async (req, res) => {
  try {
    req.body.seller = req.user.id
    const storageItem = new StorageItem(req.body)
    await storageItem.save()
    res.status(201).send(storageItem)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/:storageItemID', auth([userRoles.Seller]), async (req, res) => {
  try {
    const storageItem = await StorageItem.findById(req.params.storageItemID)
    if (storageItem === null) return res.status(400).send()
    await updateByValidKeys(storageItem, req.body, ['price', 'quantity'])
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
      const products = await StorageItem.find({ seller: req.params.sellerId })
      res.send(products)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

export default router
