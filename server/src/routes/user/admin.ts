import express, { Router, Request, Response } from 'express'
import Admin from '../../models/user/admin'
import { TypedRequestBody } from '../../TypedRequestBody'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'

const router: Router = express.Router()

//needs admin auth
router.post(
  '/',
  auth([userRoles.Admin]),
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
      const admin = new Admin(req.body)
      await admin.save()
      await admin.generateAccessToken()
      res.status(201).send(admin)
    } catch (error) {
      console.log(error)
      res.status(400).send({ message: 'invalid request' })
    }
  }
)

export default router
