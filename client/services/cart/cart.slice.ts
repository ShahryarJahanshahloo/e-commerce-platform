import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiCartItem } from './cart.entities'
import { GetCart } from '../../services/user/user.api'
import { AppThunk } from '../../utils/store'

interface CartState {
  data: ApiCartItem[]
}

const initialState: CartState = { data: [] }

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ApiCartItem[]>) => {
      state.data = action.payload
    },
    addToCart: (state, action: PayloadAction<ApiCartItem>) => {
      state.data.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.data.filter(item => {
        return item.storageItem !== action.payload
      })
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.data.find(cartItem => {
        return cartItem.storageItem === action.payload
      })
      if (item !== undefined) item.quantity += 1
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.data.find(cartItem => {
        return cartItem.storageItem === action.payload
      })
      if (item !== undefined) item.quantity -= 1
    },
  },
})

export const {
  setCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = CartSlice.actions
export default CartSlice.reducer
