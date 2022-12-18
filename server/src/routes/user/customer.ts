import express, { Router, Request, Response } from 'express'
import Customer from '../../models/user/customer'
import { TypedRequestBody } from '../../TypedRequestBody'

const router: Router = express.Router()

router.post(
  '/customer',
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
      const customer = new Customer(req.body)
      await customer.save()
      customer.generateAccessToken()
      res.send(customer)
    } catch (error) {
      console.log(error)
      res.status(400).send()
    }
  }
)

export default router
