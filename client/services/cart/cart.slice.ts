import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiCartItem, FormCartItem } from './cart.entities'
import { GetCart } from './cart.api'
import { AxiosError } from 'axios'

interface CartState {
  data?: ApiCartItem[]
  error?: AxiosError
}

const initialState: CartState = {}

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload
    },
    setCart: (state, action: PayloadAction<ApiCartItem[]>) => {
      state.data = action.payload
    },
    addToCart: (state, action: PayloadAction<ApiCartItem>) => {
      state.data?.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.data = state.data?.filter(item => {
        return item.storageItem._id !== action.payload
      })
    },
    changeQuantity: (state, action: PayloadAction<FormCartItem>) => {
      const item = state.data?.find(cartItem => {
        return cartItem.storageItem._id === action.payload.storageItem
      })
      if (item !== undefined) item.quantity = action.payload.quantity
    },
  },
})

export const { setError, setCart, addToCart, removeFromCart, changeQuantity } =
  CartSlice.actions
export default CartSlice.reducer
