import { AsyncThunk, unwrapResult } from '@reduxjs/toolkit'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../utils/store'

export const useRequest = <ThunkInput = void>(
  thunk: AsyncThunk<any, ThunkInput, any>,
  requestOnMount: false | (ThunkInput extends void ? true : ThunkInput) = false
) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const sendRequest = useCallback((args: ThunkInput) => {
    setLoading(true)
    return dispatch(thunk(args)).then(res => {
      setLoading(false)
      return unwrapResult(res)
    })
  }, [])

  // I Hate Typescript
  useEffect(() => {
    if (requestOnMount) {
      if (typeof requestOnMount === 'boolean') {
        ;(sendRequest as any)()
      } else {
        ;(sendRequest as any)(requestOnMount)
      }
    }
  }, [])

  return { loading, sendRequest }
}
