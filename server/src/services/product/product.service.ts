import Product from '../../models/product/product.model'
import { updateByValidKeys } from '../../utils/common'

export const create = async (body: any) => {
  const product = new Product(body)
  await product.save()
  return product
}

export const findById = async (productId: any) => {
  const product = await Product.findById(productId)
  if (product === null) throw new Error()
  return product
}

export const findAndUpdate = async (productId: any, updates: any) => {
  const product = await Product.findById(productId)
  if (product === null) throw new Error()
  await updateByValidKeys(product, updates, [
    'name',
    'description',
    'featureValues',
  ])
  return product
}

export const ChangeProductApprovement = async (
  productId: any,
  value: boolean
) => {
  const product = await Product.findById(productId)
  if (product === null) throw new Error()
  product.isApproved = value
  await product.save()
  return product
}

export const ChangeProductActivity = async (productId: any, value: boolean) => {
  const product = await Product.findById(productId)
  if (product === null) throw new Error()
  product.isActive = value
  await product.save()
  return product
}

export const getProductByCategoryId = async (categoryId: any) => {
  const products = await Product.getCategoryProducts(categoryId)
  return products
}

export const searchByName = async (query: any) => {
  const products = await Product.find({ name: new RegExp(query) })
  return products
}

export const rateProduct = async (productId: any, value: any, userId: any) => {
  const product = await Product.findById(productId)
  if (product === null) throw new Error()
  for (const rating of product.ratings) {
    if (rating.customer == userId) {
      rating.value = value
      await product.save()
      return product
    }
  }
  product.ratings.push({
    customer: userId,
    value: value,
  })
  await product.save()
  return product
}

export const removeRate = async (productId: any, userId: any) => {
  const product = await Product.findById(productId)
  if (product === null) throw new Error()
  product.ratings.filter(rating => {
    return rating.customer != userId
  })
  await product.save()
  return product
}
