import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as MainCategoryService from '../../services/category/mainCategory.service'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = await MainCategoryService.create(req.body)
    res.status(201).send(category)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const mainCategories = await MainCategoryService.getAll()
    res.send(mainCategories)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/:categoryId/children', async (req, res) => {
  try {
    const children = await MainCategoryService.getChildrenById(
      req.params.categoryId
    )
    res.send(children)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/:categoryId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = await MainCategoryService.findAndUpdate(
      req.params.categoryId,
      req.body
    )
    res.send(category)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
