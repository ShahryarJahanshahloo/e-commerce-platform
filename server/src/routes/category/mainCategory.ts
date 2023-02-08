import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as MainCategoryService from '../../services/category/mainCategory.service'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const category = await MainCategoryService.create(req.body)
    res.status(201).send(category)
  })
)

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const mainCategories = await MainCategoryService.getAll()
    res.send(mainCategories)
  })
)

router.get(
  '/:categoryId/children',
  asyncHandler(async (req, res) => {
    const children = await MainCategoryService.getChildrenById(
      req.params.categoryId
    )
    res.send(children)
  })
)

router.patch(
  '/:categoryId',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const category = await MainCategoryService.findAndUpdate(
      req.params.categoryId,
      req.body
    )
    res.send(category)
  })
)

export default router
