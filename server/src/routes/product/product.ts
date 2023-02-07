import express from 'express'
import Product, {
  IProduct,
  getCategoryProductsOptions,
} from '../../models/product/product.model'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import { updateByValidKeys } from '../../utils/common'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).send(product)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
    if (product === null) return res.status(400).send()
    res.send(product)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/:productId', auth([userRoles.Admin]), async (req, res) => {
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
})

router.patch(
  '/:productId/approve',
  auth([userRoles.Admin]),
  async (req, res) => {
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
  async (req, res) => {
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
  async (req, res) => {
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
  async (req, res) => {
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

router.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await Product.getCategoryProducts(req.params.categoryId)
    res.send(products)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/search', async (req, res) => {})

router.put('/:productId/rate', auth([userRoles.Customer]), async (req, res) => {
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
})

router.delete(
  '/:productId/rate',
  auth([userRoles.Customer]),
  async (req, res) => {
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
