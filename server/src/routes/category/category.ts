import express, { Router, Request, Response } from 'express'
import { TypedRequestBody } from '../../TypedRequestBody'
import auth from '../../middlewares/auth'
import Category from '../../models/category/category'
import mongoose from 'mongoose'
import { userRoles } from '../../models/user/user'

const router: Router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  async (
    req: TypedRequestBody<{
      name: string
      parent?: mongoose.Schema.Types.ObjectId
      isActive?: boolean
      isLeaf?: boolean
    }>,
    res: Response
  ) => {
    try {
      const category = new Category(req.body)
      await category.save()
      res.status(201).send(category)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

router.get('/main', async (req: Request, res: Response) => {
  try {
    const mainCategories = await Category.find({ parent: undefined })
    res.send(mainCategories)
  } catch (error) {}
})

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
  '/:id',
  auth([userRoles.Admin]),
  async (req: TypedRequestBody<{}>, res: Response) => {}
)

router.delete(
  '/:id',
  auth([userRoles.Admin]),
  async (req: Request, res: Response) => {}
)

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

router.post(
  '/:id/features',
  auth([userRoles.Admin]),
  async (req: TypedRequestBody<{}>, res: Response) => {}
)

router.delete(
  '/:id/features',
  auth([userRoles.Admin]),
  async (req: Request, res: Response) => {}
)

router.get('/:id/features', async (req: Request, res: Response) => {})

router.get('/:id/parents', async (req: Request, res: Response) => {})

export default router
