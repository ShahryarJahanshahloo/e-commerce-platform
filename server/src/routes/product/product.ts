import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as ProductService from '../../services/product/product.service'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const product = await ProductService.create(req.body)
    res.status(201).send(product)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/:productId', async (req, res) => {
  try {
    const product = await ProductService.findById(req.params.productId)
    res.send(product)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/:productId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const product = await ProductService.findAndUpdate(
      req.params.productId,
      req.body
    )
    res.send(product)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch(
  '/:productId/approve',
  auth([userRoles.Admin]),
  async (req, res) => {
    try {
      const product = await ProductService.ChangeProductApprovement(
        req.params.productId,
        true
      )
      res.send(product)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch(
  '/:productId/disapprove',
  auth([userRoles.Admin]),
  async (req, res) => {
    try {
      const product = await ProductService.ChangeProductApprovement(
        req.params.productId,
        false
      )
      res.send(product)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch(
  '/:productId/activate',
  auth([userRoles.Admin]),
  async (req, res) => {
    try {
      const product = await ProductService.ChangeProductActivity(
        req.params.productId,
        true
      )
      res.send(product)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.patch(
  '/:productId/deactivate',
  auth([userRoles.Admin]),
  async (req, res) => {
    try {
      const product = await ProductService.ChangeProductActivity(
        req.params.productId,
        false
      )
      res.send(product)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await ProductService.getProductByCategoryId(
      req.params.categoryId
    )
    res.send(products)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/search', async (req, res) => {})

router.put('/:productId/rate', auth([userRoles.Customer]), async (req, res) => {
  try {
    const product = await ProductService.rateProduct(
      req.params.productId,
      req.body.value,
      req.user.id
    )
    res.status(201).send(product)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete(
  '/:productId/rate',
  auth([userRoles.Customer]),
  async (req, res) => {
    try {
      const product = await ProductService.removeRate(
        req.params.productId,
        req.user.id
      )
      res.send(product)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

export default router
