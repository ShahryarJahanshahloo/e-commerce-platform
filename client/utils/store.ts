import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import serviceApi from '../services/serviceApi'

import CartSlice from '../services/cart/cart.slice'

const store = configureStore({
  reducer: {
    cart: CartSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { serviceApi },
      },
    }),
})

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  { serviceApi: typeof serviceApi },
  AnyAction
>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
