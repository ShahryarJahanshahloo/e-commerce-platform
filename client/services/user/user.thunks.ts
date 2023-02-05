import { AppThunk } from '../../utils/store'
import { authenticate } from './user.slice'

export const Authenticate =
  (): AppThunk => async (dispatch, getState, extra) => {
    try {
      const res = await extra.serviceApi.user.Authenticate()
      dispatch(authenticate(res.data.role))
    } catch (error) {}
  }
