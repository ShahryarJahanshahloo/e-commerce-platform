import express from 'express'
import userRouter from './user/user'
import categoryRouter from './category/category'
import featureRouter from './feature/feature'
import featureValueRouter from './featureValue/featureValue'
import productRouter from './product/product'
import storageItemRouter from './storageItem/storageItem'
import commentRouter from './comment/comment'
import orderRouter from './order/order'
import shipmentRouter from './shipment/shipment'

const router = express.Router()

router.get('/ping/:id', (req, res, next) => {
  throw new Error('mamad')
})

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/feature', featureRouter)
router.use('/feature/value', featureValueRouter)
router.use('/product', productRouter)
router.use('/storage', storageItemRouter)
router.use('/comment', commentRouter)
router.use('/order', orderRouter)
router.use('/shipment', shipmentRouter)

export default router
