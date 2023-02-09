// import { AsyncThunk, unwrapResult } from '@reduxjs/toolkit'
import { useCallback, useState } from 'react'
import { AppThunk, useAppDispatch } from '../utils/store'

const useThunk = <ThunkInput = void>(
  thunk: (args: ThunkInput) => AppThunk //AsyncThunk<any, ThunkInput, any>
) => {
  const dispatch = useAppDispatch()
  const [isLoading, setLoading] = useState(false)

  const sendRequest = useCallback(async (args: ThunkInput) => {
    try {
      setLoading(true)
      await dispatch(thunk(args))
      setLoading(false)
    } catch (error) {}
  }, [])

  return { isLoading, sendRequest }
}

export default useThunk
