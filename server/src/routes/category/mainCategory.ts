import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'
import MainCategory, { IMainCategory } from '../../models/category/mainCategory'
import { updateByValidKeys } from '../../utils/common'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = new MainCategory(req.body)
    await category.save()
    res.status(201).send(category)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const mainCategories = await MainCategory.find({ isActive: true })
    res.send(mainCategories)
  } catch (error) {}
})

router.get('/:categoryId/children', async (req, res) => {
  try {
    const category = await MainCategory.find({
      isActive: true,
      _id: req.params.categoryId,
    }).populate('children')
    res.send(category)
  } catch (error) {}
})

router.patch('/:categoryId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = await MainCategory.findById(req.params.categoryId)
    if (category === null) return res.status(400).send()
    await updateByValidKeys(category, req.body, ['name'])
    res.send(category)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
