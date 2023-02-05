import { AsyncThunk, unwrapResult } from '@reduxjs/toolkit'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../utils/store'

export const useRequest = <ThunkInput = void>(
  thunk: AsyncThunk<any, ThunkInput, any>,
  requestOnMount: false | (ThunkInput extends void ? true : ThunkInput) = false
) => {
  const dispatch = useAppDispatch()
  const [isLoading, setLoading] = useState(false)

  const sendRequest = useCallback(async (args: ThunkInput) => {
    try {
      setLoading(true)
      const res = await dispatch(thunk(args))
      setLoading(false)
      return unwrapResult(res)
    } catch (error) {}
  }, [])

  useEffect(() => {
    if (requestOnMount) {
      if (typeof requestOnMount === 'boolean') {
        ;(sendRequest as any)()
      } else {
        ;(sendRequest as any)(requestOnMount)
      }
    }
  }, [])

  return { isLoading, sendRequest }
}
