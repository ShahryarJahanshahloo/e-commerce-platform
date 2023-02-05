import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { userRoles } from './user.entities'

interface UserState {
  data: {
    isLoggedIn: boolean
    role?: userRoles
  }
  error?: AxiosError
}

const initialState: UserState = { data: { isLoggedIn: false } }

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload
    },
    authenticate: (state, action: PayloadAction<userRoles>) => {
      state.data = { isLoggedIn: true, role: action.payload }
    },
  },
})

export const { setError, authenticate } = UserSlice.actions
export default UserSlice.reducer
