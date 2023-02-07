import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import MiddleCategory, {
  IMiddleCategory,
} from '../../models/category/middleCategory/middleCategory.model'
import { updateByValidKeys } from '../../utils/common'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = new MiddleCategory(req.body)
    await category.save()
    res.status(201).send(category)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/:categoryId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const category = await MiddleCategory.findById(req.params.categoryId)
    if (category === null) return res.status(400).send()
    await updateByValidKeys(category, req.body, ['name', 'parent'])
    res.send(category)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
