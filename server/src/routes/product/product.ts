import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as ProductService from '../../services/product/product.service'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const product = await ProductService.create(req.body)
    res.status(201).send(product)
  })
)

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductService.getAllIds()
    res.send(products)
  })
)

router.get(
  '/search',
  asyncHandler(async (req, res) => {
    const products = await ProductService.searchByName(req.query.query)
    res.send(products)
  })
)

router.get(
  '/category/:categoryId',
  asyncHandler(async (req, res) => {
    const products = await ProductService.getProductByCategoryId(
      req.params.categoryId
    )
    res.send(products)
  })
)

router.get(
  '/:productId',
  asyncHandler(async (req, res) => {
    const product = await ProductService.findById(req.params.productId)
    res.send(product)
  })
)

router.patch(
  '/:productId',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const product = await ProductService.findAndUpdate(
      req.params.productId,
      req.body
    )
    res.send(product)
  })
)

router.patch(
  '/:productId/approve',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const product = await ProductService.ChangeProductApprovement(
      req.params.productId,
      true
    )
    res.send(product)
  })
)

router.patch(
  '/:productId/disapprove',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const product = await ProductService.ChangeProductApprovement(
      req.params.productId,
      false
    )
    res.send(product)
  })
)

router.patch(
  '/:productId/activate',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const product = await ProductService.ChangeProductActivity(
      req.params.productId,
      true
    )
    res.send(product)
  })
)

router.patch(
  '/:productId/deactivate',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const product = await ProductService.ChangeProductActivity(
      req.params.productId,
      false
    )
    res.send(product)
  })
)

router.put(
  '/:productId/rate',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const product = await ProductService.rateProduct(
      req.params.productId,
      req.body.value,
      req.user.id
    )
    res.status(201).send(product)
  })
)

router.delete(
  '/:productId/rate',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const product = await ProductService.removeRate(
      req.params.productId,
      req.user.id
    )
    res.send(product)
  })
)

export default router
