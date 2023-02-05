import { AppThunk } from '../../utils/store'
import { setCart, setError } from './cart.slice'

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
