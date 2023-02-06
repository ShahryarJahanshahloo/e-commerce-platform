import express from 'express'
import {
  TypedRequestBody,
  TypedRequestBodyWithParams,
} from '../../TypedRequestBody'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'
import MiddleCategory, {
  IMiddleCategory,
} from '../../models/category/middleCategory'
import { updateByValidKeys } from '../../utils/common'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  async (req: TypedRequestBody<IMiddleCategory>, res) => {
    try {
      const category = new MiddleCategory(req.body)
      await category.save()
      res.status(201).send(category)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

router.patch(
  '/:categoryId',
  auth([userRoles.Admin]),
  async (
    req: TypedRequestBodyWithParams<IMiddleCategory, { categoryId: string }>,
    res
  ) => {
    try {
      const category = await MiddleCategory.findById(req.params.categoryId)
      if (category === null) return res.status(400).send()
      await updateByValidKeys(category, req.body, ['name', 'parent'])
      res.send(category)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

export default router
