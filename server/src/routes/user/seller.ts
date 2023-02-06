import express from 'express'
import Seller, { ISeller } from '../../models/user/seller'
import {
  TypedRequestBody,
  TypedRequestBodyWithParams,
} from '../../TypedRequestBody'
import { userRoles } from '../../models/user/user'
import auth from '../../middlewares/auth'
import { updateByValidKeys } from '../../utils/common'

const router = express.Router()

router.post('/', async (req: TypedRequestBody<ISeller>, res) => {
  try {
    const seller = new Seller(req.body)
    await seller.save()
    await seller.generateAccessToken()
    res.status(201).send(seller)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put(
  '/:sellerId/rate',
  auth([userRoles.Customer]),
  async (
    req: TypedRequestBodyWithParams<
      {
        value: number
      },
      { sellerId: string }
    >,
    res
  ) => {
    try {
      const seller = await Seller.findById(req.params.sellerId)
      if (seller === null) return res.status(400).send()
      for (const rating of seller.ratings) {
        if (rating.customer == req.user.id) {
          rating.value = req.body.value
          await seller.save()
          return res.send()
        }
      }
      seller.ratings.push({
        customer: req.user.id,
        value: req.body.value,
      })
      await seller.save()
      res.status(201).send()
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

router.delete(
  '/:sellerId/rate',
  auth([userRoles.Customer]),
  async (req, res) => {
    try {
      const seller = await Seller.findById(req.params.sellerId)
      if (seller === null) return res.status(400).send()
      seller.ratings.filter(rating => {
        return rating.customer != req.user.id
      })
      await seller.save()
      res.send()
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

router.get('/me', auth([userRoles.Seller]), async (req, res) => {
  try {
    const seller = await Seller.findById(req.user.id)
    if (seller == null) return res.status(400).send()
    res.send(seller)
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'invalid request' })
  }
})

router.patch(
  '/me',
  auth([userRoles.Seller]),
  async (req: TypedRequestBodyWithParams<ISeller, {}>, res) => {
    try {
      const seller = await Seller.findById(req.user.id)
      if (seller === null) return res.status(400).send()
      await updateByValidKeys(seller, req.body, [
        'name',
        'lastName',
        'phoneNumber',
        'shopSlug',
        'description',
        'address',
      ])
      res.send(seller)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

export default router
