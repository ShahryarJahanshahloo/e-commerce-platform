import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as CategoryService from '../../services/category/category.service'

const router = express.Router()

router.get('/:categoryId', async (req, res) => {
  try {
    const category = await CategoryService.findById(req.params.categoryId)
    res.send(category)
  } catch (error) {
    res.status(500).send()
  }
})

router.patch(
  '/:categoryId/activate',
  auth([userRoles.Admin]),
  async (req, res) => {
    try {
      const category = await CategoryService.changeActivity(
        req.params.categoryId,
        true
      )
      res.send(category)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch(
  '/:categoryId/deactivate',
  auth([userRoles.Admin]),
  async (req, res) => {
    try {
      const category = await CategoryService.changeActivity(
        req.params.categoryId,
        false
      )
      res.send(category)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

export default router
