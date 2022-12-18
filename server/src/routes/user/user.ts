import express, { Router, Request, Response } from 'express'
import Customer from '../../models/user/customer'

const router: Router = express.Router()

router.get('/login', async (req: Request, res: Response) => {})

export default router
