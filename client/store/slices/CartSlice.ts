import { createSlice } from '@reduxjs/toolkit'

const initialState: any[] = []

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setInitial: (state, action) => {},
    addToCart: (state, action) => {},
    removeFromCart: (state, action) => {},
    increaseQuantity: (state, action) => {},
    decreaseQuantity: (state, action) => {},
  },
})

export const {} = CartSlice.actions
export default CartSlice.reducer
