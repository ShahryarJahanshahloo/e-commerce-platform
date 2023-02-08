import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as CategoryService from '../../services/category/category.service'

const router = express.Router()

router.get(
  '/:categoryId',
  asyncHandler(async (req, res) => {
    const category = await CategoryService.findById(req.params.categoryId)
    res.send(category)
  })
)

router.patch(
  '/:categoryId/activate',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const category = await CategoryService.changeActivity(
      req.params.categoryId,
      true
    )
    res.send(category)
  })
)

router.patch(
  '/:categoryId/deactivate',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const category = await CategoryService.changeActivity(
      req.params.categoryId,
      false
    )
    res.send(category)
  })
)

export default router
