import express, { Router } from 'express'
import auth from '../../middlewares/auth'
import Category from '../../models/category/category'
import { userRoles } from '../../models/user/user'
import leafCategoryRouter from './leafCategory'
import mainCategoryRouter from './mainCategory'
import middleCategoryRouter from './middleCategory'
import mongoose from 'mongoose'
import { toggleActivity } from '../../utils/category'

const router: Router = express.Router()

router.use('/leaf', leafCategoryRouter)
router.use('/main', mainCategoryRouter)
router.use('/middle', middleCategoryRouter)

router.get('/:categoryId', async (req, res) => {
  try {
    const id = req.params.categoryId
    const category = await Category.findById(id)
    if (category === null) return res.status(400).send()
    res.send(category)
  } catch (error) {
    res.status(500).send()
  }
})

router.patch(
  '/:categoryId/activate',
  auth([userRoles.Admin]),
  async (req, res) => {
    const session = await mongoose.connection.startSession()
    try {
      session.startTransaction()
      const category = await Category.findById(req.params.categoryId)
      if (category === null) return res.status(400).send()
      await toggleActivity(category, true)
      await session.commitTransaction()
      res.send()
    } catch (error) {
      await session.abortTransaction()
      res.status(400).send(error)
    }
    session.endSession()
  }
)

router.patch(
  '/:categoryId/deactivate',
  auth([userRoles.Admin]),
  async (req, res) => {
    const session = await mongoose.connection.startSession()
    try {
      session.startTransaction()
      const category = await Category.findById(req.params.categoryId)
      if (category === null) return res.status(400).send()
      await toggleActivity(category, false)
      await session.commitTransaction()
      res.send()
    } catch (error) {
      await session.abortTransaction()
      res.status(400).send(error)
    }
    session.endSession()
  }
)

export default router
