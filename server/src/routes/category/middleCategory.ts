import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as MiddleCategoryService from '../../services/category/middleCategory.service'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const category = await MiddleCategoryService.create(req.body)
    res.status(201).send(category)
  })
)

router.patch(
  '/:categoryId',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const category = await MiddleCategoryService.findAndUpdate(
      req.params.categoryId,
      req.body
    )
    res.send(category)
  })
)

export default router
