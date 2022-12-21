import express, { Router, Request, Response } from 'express'
import Seller from '../../models/user/seller'
import { TypedRequestBody } from '../../TypedRequestBody'

const router: Router = express.Router()

router.post(
  '/',
  async (
    req: TypedRequestBody<{
      name: string
      lastName: string
      email: string
      phoneNumber: number
      password: string
    }>,
    res: Response
  ) => {
    try {
      const seller = new Seller(req.body)
      await seller.save()
      await seller.generateAccessToken()
      res.status(201).send(seller)
    } catch (error) {
      console.log(error)
      res.status(400).send({ message: 'invalid request' })
    }
  }
)

export default router
