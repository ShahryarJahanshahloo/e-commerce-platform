import express, { Router, Request, Response } from 'express'
import { TypedRequestBody } from '../../TypedRequestBody'
import auth from '../../middlewares/auth'
import Category from '../../models/category/category'
import { userRoles } from '../../models/user/user'
import leafCategoryRouter from './leafCategory'
import mainCategoryRouter from './mainCategory'
import middleCategoryRouter from './middleCategory'

const router: Router = express.Router()

router.use('/leaf', leafCategoryRouter)
router.use('/main', mainCategoryRouter)
router.use('/middle', middleCategoryRouter)

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const category = await Category.findById(id)
    if (category === null) return res.status(400).send()
    res.send(category)
  } catch (error) {
    res.status(500).send()
  }
})

router.patch(
  '/:id/activate',
  auth([userRoles.Admin]),
  async (req: Request, res: Response) => {}
)

router.patch(
  '/:id/deactivate',
  auth([userRoles.Admin]),
  async (req: Request, res: Response) => {}
)

export default router
