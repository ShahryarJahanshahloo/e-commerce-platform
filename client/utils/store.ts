import {
  configureStore,
  ThunkAction,
  AnyAction,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import serviceApi from '../services/serviceApi'

import CartSlice from '../services/cart/cart.slice'
import UserSlice from '../services/user/user.slice'

const store = configureStore({
  reducer: {
    cart: CartSlice,
    user: UserSlice,
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

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
  extra: { serviceApi: typeof serviceApi }
  rejectedMeta?: unknown
}>()

export default store
