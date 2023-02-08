import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as MiddleCategoryService from '../../services/category/middleCategory.service'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = await MiddleCategoryService.create(req.body)
    res.status(201).send(category)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/:categoryId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = await MiddleCategoryService.findAndUpdate(
      req.params.categoryId,
      req.body
    )
    res.send(category)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
