import Seller from '../../models/user/seller/seller.model'
import { updateByValidKeys } from '../../utils/common'

export const create = async (body: any) => {
  const seller = new Seller(body)
  await seller.save()
  await seller.generateAccessToken()
  return seller
}

export const rate = async (sellerId: any, value: any, userId: any) => {
  const seller = await Seller.findById(sellerId)
  if (seller === null) throw new Error()
  for (const rating of seller.ratings) {
    if (rating.customer == userId) {
      rating.value = value
      await seller.save()
      return seller
    }
  }
  seller.ratings.push({
    customer: userId,
    value: value,
  })
  await seller.save()
  return seller
}

export const removeRate = async (sellerId: any, userId: any) => {
  const seller = await Seller.findById(sellerId)
  if (seller === null) throw new Error()
  seller.ratings.filter(rating => {
    return rating.customer != userId
  })
  await seller.save()
  return seller
}

export const findById = async (sellerId: any) => {
  const seller = await Seller.findById(sellerId)
  if (seller == null) throw new Error()
  return seller
}

export const findAndUpdate = async (sellerId: any, updates: any) => {
  const seller = await Seller.findById(sellerId)
  if (seller === null) throw new Error()
  await updateByValidKeys(seller, updates, [
    'name',
    'lastName',
    'phoneNumber',
    'shopSlug',
    'description',
    'address',
  ])
  return seller
}
