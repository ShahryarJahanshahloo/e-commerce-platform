import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './slices/CartSlice'

export default configureStore({
  reducer: {
    cart: CartSlice,
  },
})
