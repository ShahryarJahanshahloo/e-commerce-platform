import { RequestReturnType } from '../axios'
import request from '../axios'
import { ApiOrder, FormOrder } from './order.entities'

export const CreateOrder = (order: FormOrder): RequestReturnType<ApiOrder> => {
  return request.post('/order', { ...order })
}

export const GetOrder = (orderId: string): RequestReturnType<ApiOrder> => {
  return request.get('/order/' + orderId)
}

export const GetOrdersOfCustomer = (
  customerId: string
): RequestReturnType<ApiOrder[]> => {
  return request.get('/order/customer/' + customerId)
}

export const GetMyOrders = (): RequestReturnType<ApiOrder[]> => {
  return request.get('/order/customer/me')
}

export const CancelOrder = (orderId: string): RequestReturnType<ApiOrder> => {
  return request.patch('/order/' + orderId + '/cancel')
}

export const CheckoutOrder = (orderId: string): RequestReturnType<ApiOrder> => {
  return request.post('/order/' + orderId + '/checkout')
}
