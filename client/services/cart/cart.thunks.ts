import { AppThunk } from '../../utils/store'
import { FormCartItem } from './cart.entities'
import { setCart, setError, changeQuantity } from './cart.slice'

const delay = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
}

export const fetchCart = (): AppThunk => async (dispatch, getState, extra) => {
  try {
    const res = await extra.serviceApi.cart.GetCart()
    await delay()
    dispatch(setCart(res))
  } catch (error) {
    dispatch(setError(error))
  }
}

// export const fetchCart = createAppAsyncThunk(
//   'cart/fetch',
//   async (arg, { dispatch, extra }) => {
//     const res = await extra.serviceApi.cart.GetCart()
//     dispatch(setCart(res))
//   }
// )

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
