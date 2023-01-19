import express, { Router, Request, Response } from 'express'
import Admin, { IAdmin } from '../../models/user/admin'
import {
  TypedRequestBody,
  TypedRequestBodyWithParams,
} from '../../TypedRequestBody'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'
import { updateByValidKeys } from '../../utils/common'

const router: Router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  async (req: TypedRequestBody<IAdmin>, res: Response) => {
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

router.patch(
  '/:adminId',
  auth([userRoles.Admin]),
  async (
    req: TypedRequestBodyWithParams<IAdmin, { adminId: string }>,
    res: Response
  ) => {
    try {
      const admin = await Admin.findById(req.params.adminId)
      if (admin === null) return res.status(400).send()
      await updateByValidKeys(admin, req.body, [
        'name',
        'lastName',
        'phoneNumber',
      ])
      res.send(admin)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

export default router
