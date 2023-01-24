import express, { Router, Request, Response } from 'express'
import {
  TypedRequest,
  TypedRequestBody,
  TypedRequestBodyWithParams,
} from '../../TypedRequestBody'
import Product, {
  IProduct,
  getCategoryProductsOptions,
} from '../../models/product/product'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'
import { updateByValidKeys } from '../../utils/common'
// const { upload, uploadErrorHandler } = require('../middleware/upload')

const router: Router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  async (req: TypedRequestBody<IProduct>, res: Response) => {
    try {
      const product = new Product(req.body)
      await product.save()
      res.status(201).send(product)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

// router.post(
//   '/:productId/image',
//   auth([userRoles.Admin]),
//   upload.single('avatar'),
//   async (req: Request, res: Response) => {
//     try {
//       const product = await Product.findById(req.params.productId)
//       if (product == null) return res.status(400).send()
//       product.image = req.file.buffer
//       await product.save()
//       res.status(200).send()
//     } catch (e) {
//       res.status(500).send()
//     }
//   },
//   uploadErrorHandler
// )

// router.get('/:productId/image', async (req: Request, res: Response) => {
//   try {
//     const product = await Product.findById(req.params.productId)
//     if (!product || !product.image) return res.status(400).send()
//     res.set('Content-Type', 'image/jpg')
//     res.send(product.image)
//   } catch (e) {
//     res.status(500).send()
//   }
// })

router.get('/:productId', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.productId)
    if (product === null) return res.status(400).send()
    res.send(product)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch(
  '/:productId',
  auth([userRoles.Admin]),
  async (
    req: TypedRequestBodyWithParams<IProduct, { productId: string }>,
    res: Response
  ) => {
    try {
      const product = await Product.findById(req.params.productId)
      if (product === null) return res.status(400).send()
      await updateByValidKeys(product, req.body, [
        'name',
        'description',
        'featureValues',
      ])
      res.send(product)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch(
  '/:productId/approve',
  auth([userRoles.Admin]),
  async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.productId)
      if (product === null) return res.status(400).send()
      product.isApproved = true
      await product.save()
      res.send(product)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch(
  '/:productId/disapprove',
  auth([userRoles.Admin]),
  async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.productId)
      if (product === null) return res.status(400).send()
      product.isApproved = false
      await product.save()
      res.send(product)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch(
  '/:productId/activate',
  auth([userRoles.Admin]),
  async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.productId)
      if (product === null) return res.status(400).send()
      product.isActive = true
      await product.save()
      res.send(product)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch(
  '/:productId/deactivate',
  auth([userRoles.Admin]),
  async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.productId)
      if (product === null) return res.status(400).send()
      product.isActive = false
      await product.save()
      res.send(product)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.get(
  '/category/:categoryId',
  async (
    req: TypedRequest<{}, { categoryId: string }, getCategoryProductsOptions>,
    res: Response
  ) => {
    try {
      const products = await Product.getCategoryProducts(
        req.params.categoryId,
        req.query
      )
      res.send(products)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.get('/search', async (req: Request, res: Response) => {})

router.put(
  '/:productId/rate',
  auth([userRoles.Customer]),
  async (
    req: TypedRequestBodyWithParams<
      {
        value: number
      },
      { id: string }
    >,
    res: Response
  ) => {
    try {
      const product = await Product.findById(req.params.id)
      if (product === null) return res.status(400).send()
      for (const rating of product.ratings) {
        if (rating.customer == req.user.id) {
          rating.value = req.body.value
          await product.save()
          return res.send()
        }
      }
      product.ratings.push({
        customer: req.user.id,
        value: req.body.value,
      })
      await product.save()
      res.status(201).send()
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

router.delete(
  '/:productId/rate',
  auth([userRoles.Customer]),
  async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id)
      if (product === null) return res.status(400).send()
      product.ratings.filter(rating => {
        return rating.customer != req.user.id
      })
      await product.save()
      res.send()
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

export default router
