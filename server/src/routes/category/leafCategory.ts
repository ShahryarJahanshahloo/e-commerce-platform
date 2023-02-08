import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as LeafCategoryService from '../../services/category/leafCategory.service'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const category = await LeafCategoryService.create(req.body)
    res.status(201).send(category)
  })
)

router.get(
  '/:categoryId/features',
  asyncHandler(async (req, res) => {
    const features = await LeafCategoryService.getFeaturesById(
      req.params.categoryId
    )
    res.send(features)
  })
)

router.patch(
  '/:categoryId',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const category = await LeafCategoryService.findAndUpdate(
      req.params.categoryId,
      req.body
    )
    res.send(category)
  })
)

export default router
