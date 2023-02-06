import express from 'express'

import userRouter from './user/user'
import categoryRouter from './category/category'
import featureRouter from './feature/feature'
import productRouter from './product/product'
import storageItemRouter from './storageItem/storageItem'
import commentRouter from './comment/comment'
import orderRouter from './order/order'
import shipmentRouter from './shipment/shipment'

const router = express.Router()

router.get('/ping', (req, res, next) => {
  try {
  } catch (error) {}
  res.send('pong')
})

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/feature', featureRouter)
router.use('/product', productRouter)
router.use('/storage', storageItemRouter)
router.use('/comment', commentRouter)
router.use('/order', orderRouter)
router.use('/shipment', shipmentRouter)

export default router
