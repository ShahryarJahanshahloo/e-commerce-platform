import { AppThunk } from '../../utils/store'
import { FormCartItem } from './cart.entities'
import { setCart, setError, changeQuantity } from './cart.slice'

export const fetchCart = (): AppThunk => async (dispatch, getState, extra) => {
  try {
    const res = await extra.serviceApi.cart.GetCart()
    dispatch(setCart(res.data))
  } catch (error) {
    dispatch(setError(error))
  }
}

export const changeItemQuantity =
  (cartItem: FormCartItem): AppThunk =>
  async (dispatch, getState, extra) => {
    try {
      await extra.serviceApi.cart.AddToCart(cartItem)
      dispatch(changeQuantity(cartItem))
    } catch (error) {
      dispatch(setError(error))
    }
  }
