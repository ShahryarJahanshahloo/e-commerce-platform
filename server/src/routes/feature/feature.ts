import express, { Router, Request, Response } from 'express'
import { TypedRequestBody } from '../../TypedRequestBody'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'

const router: Router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  async (req: TypedRequestBody<{}>, res: Response) => {}
)

router.get('/:id', async (req: Request, res: Response) => {})

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

export default router
