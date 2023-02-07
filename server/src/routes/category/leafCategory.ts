import express, { Router } from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'
import LeafCategory, { ILeafCategory } from '../../models/category/leafCategory'
import { updateByValidKeys } from '../../utils/common'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = new LeafCategory(req.body)
    await category.save()
    res.status(201).send(category)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/:categoryId/features', async (req, res) => {
  try {
    const category = await LeafCategory.findById(req.params.categoryId)
    if (category === null) return res.status(400).send()
    res.send(category.features)
  } catch (error) {
    res.status(500).send()
  }
})

router.patch('/:categoryId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = await LeafCategory.findById(req.params.categoryId)
    if (category === null) return res.status(400).send()
    await updateByValidKeys(category, req.body, ['name', 'parent'])
    res.send(category)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
