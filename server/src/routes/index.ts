import express, { Router } from 'express'

import userRouter from './user/user'
import customerRouter from './user/customer'
import adminRouter from './user/admin'
import sellerRouter from './user/seller'

import auth from '../middlewares/auth'

const router: Router = express.Router()

router.get('/ping', auth(['Customer']), (req, res) => {
  res.send('pong')
})

router.use('/user', userRouter)
router.use('/customer', customerRouter)
router.use('/admin', adminRouter)
router.use('/seller', sellerRouter)

export default router
