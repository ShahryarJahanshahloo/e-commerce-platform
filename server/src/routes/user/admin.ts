import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as AdminService from '../../services/user/admin.service'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const admin = await AdminService.create(req.body)
    res.status(201).send(admin)
  })
)

router.get(
  '/me',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const admin = await AdminService.findById(req.user.id)
    res.send(admin)
  })
)

router.patch(
  '/me',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const admin = await AdminService.findAndUpdate(req.user.id, req.body)
    res.send(admin)
  })
)

export default router
