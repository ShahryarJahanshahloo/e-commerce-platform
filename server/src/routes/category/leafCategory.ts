import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as LeafCategoryService from '../../services/category/leafCategory.service'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = await LeafCategoryService.create(req.body)
    res.status(201).send(category)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/:categoryId/features', async (req, res) => {
  try {
    const features = await LeafCategoryService.getFeaturesById(
      req.params.categoryId
    )
    res.send(features)
  } catch (error) {
    res.status(500).send()
  }
})

router.patch('/:categoryId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = await LeafCategoryService.findAndUpdate(
      req.params.categoryId,
      req.body
    )
    res.send(category)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
