import Customer from '../../models/user/customer/customer.model'
import { updateByValidKeys } from '../../utils/common'

export const create = async (body: any) => {
  const customer = new Customer(body)
  await customer.save()
  await customer.generateAccessToken()
  return customer
}

export const findById = async (userId: any) => {
  const customer = await Customer.findById(userId)
  if (customer == null) throw new Error()
  return customer
}

export const addToCart = async (
  userId: any,
  storageItemId: any,
  quantity: any
) => {
  const customer = await Customer.findById(userId)
  if (customer === null) throw new Error()
  for (const cartItem of customer.cart) {
    if (cartItem.storageItem === storageItemId) {
      cartItem.quantity = quantity
      await customer.save()
      return customer
    }
  }
  customer.cart.push({
    storageItem: storageItemId,
    quantity: quantity,
  })
  await customer.save()
  return customer
}

export const removeFromCart = async (userId: any, storageItemId: any) => {
  const customer = await Customer.findById(userId)
  if (customer === null) throw new Error()
  customer.cart.filter(cartItem => {
    return cartItem.storageItem.toString() !== storageItemId
  })
  await customer.save()
  return customer
}

export const findAndUpdate = async (customerId: any, updates: any) => {
  const customer = await Customer.findById(customerId)
  if (customer === null) throw new Error()
  await updateByValidKeys(customer, updates, [
    'name',
    'lastName',
    'phoneNumber',
    'address',
  ])
  return customer
}
