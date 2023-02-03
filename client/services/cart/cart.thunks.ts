import { AppThunk } from '../../utils/store'
import { setCart } from './cart.slice'

export const fetchCart = (): AppThunk => async (dispatch, getState, extra) => {
  const res = await extra.serviceApi.cart.GetCart()
  dispatch(setCart(res))
}
