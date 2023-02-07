import Order, { orderStates } from '../../models/order/order.model'
import axios from 'axios'
import Seller from '../../models/user/seller/seller.model'
import Shipment, { shipmentStates } from '../../models/shipment/shipment.model'

export const create = async (body: any) => {
  const order = new Order(body)
  await order.save()
  return order
}

export const finalizeOrder = async (trackId: any) => {
  const checkoutResult = await axios.post(
    'https://gateway.zibal.ir/v1/verify',
    {
      merchant: 'zibal',
      trackId: trackId,
    }
  )
  if (checkoutResult.data.status != 1) throw new Error()

  const order = await Order.findById(checkoutResult.data.orderId)
  if (order === null) throw new Error()
  order.state = orderStates.Paid
  //needs transaction
  await order.save()
  order.items.forEach(async item => {
    const seller = await Seller.findById(item.seller)
    if (seller === null) throw new Error()
    seller.balance += item.price * item.quantity
    await seller.save()
  })
  const sellers = new Set()
  order.items.forEach(item => {
    sellers.add(item.seller)
  })
  sellers.forEach(async seller => {
    const shipment = new Shipment({
      order: order.id,
      seller: seller,
      state: shipmentStates.Pending,
    })
    await shipment.save()
  })
  return order
}

export const findById = async (orderId: any) => {
  const order = await Order.findById(orderId)
  if (order === null) throw new Error()
  return order
}

export const getCustomerOrders = async (orderId: any) => {
  const orders = await Order.find({ customer: orderId })
  return orders
}

export const getMyOrders = async (userId: any) => {
  const orders = await Order.find({ customer: userId })
  return orders
}

export const cancelOrder = async (orderId: any, userId: any) => {
  const order = await Order.findOne({
    _id: orderId,
    customer: userId,
  })
  if (order === null) throw new Error()
  order.state = orderStates.Canceled
  await order.save()
  return order
}

export const checkout = async (orderId: any) => {
  const order = await Order.findById(orderId)
  if (order === null) throw new Error()
  if (order.state !== orderStates.Pending) throw new Error()
  const result = await axios.post('https://gateway.zibal.ir/v1/request', {
    merchant: 'zibal',
    amount: order.total,
    callbackUrl: 'http://localhost:3001/order/callback',
    orderId: order.id,
  })
  return 'https://gateway.zibal.ir/start/' + result.data.trackId
}
