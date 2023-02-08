import express from 'express'
import asyncHandler from 'express-async-handler'
import userRouter from './user/user'
import customerRouter from './user/customer'
import adminRouter from './user/admin'
import sellerRouter from './user/seller'
import categoryRouter from './category/category'
import leafCategoryRouter from './category/leafCategory'
import mainCategoryRouter from './category/mainCategory'
import middleCategoryRouter from './category/middleCategory'
import featureRouter from './feature/feature'
import featureValueRouter from './featureValue/featureValue'
import productRouter from './product/product'
import storageItemRouter from './storageItem/storageItem'
import commentRouter from './comment/comment'
import orderRouter from './order/order'
import shipmentRouter from './shipment/shipment'

const router = express.Router()

router.get(
  '/ping',
  asyncHandler(async (req, res) => {
    await Promise.reject('pong error')
  })
)

router.use('/user', userRouter)
router.use('/user/customer', customerRouter)
router.use('/user/admin', adminRouter)
router.use('/user/seller', sellerRouter)
router.use('/category', categoryRouter)
router.use('/category/leaf', leafCategoryRouter)
router.use('/category/main', mainCategoryRouter)
router.use('/category/middle', middleCategoryRouter)
router.use('/feature', featureRouter)
router.use('/feature/value', featureValueRouter)
router.use('/product', productRouter)
router.use('/storage', storageItemRouter)
router.use('/comment', commentRouter)
router.use('/order', orderRouter)
router.use('/shipment', shipmentRouter)

export default router
