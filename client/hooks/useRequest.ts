import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'

type UseRequestType<T> = {
  isLoading: boolean
  response: T | undefined
  responseFull: AxiosResponse<T> | undefined
  error: AxiosError | undefined
  call: (...args: any) => void
}

export type RequestReturnType<T> = Promise<AxiosResponse<T>>

export const useRequest = <T = unknown>(
  request: (...args: any) => RequestReturnType<T>,
  callOnMount = false,
  onSuccess?: (response: T) => void,
  onError?: (error: AxiosError) => void
): UseRequestType<T> => {
  const [isLoading, setLoading] = useState(false)
  const [response, setResponse] = useState<AxiosResponse>()
  const [error, setError] = useState<AxiosError>()

  const call = useCallback(
    async (...args: any) => {
      try {
        setLoading(true)
        const response = await request(...args)
        setResponse(response)
        onSuccess?.(response.data)
      } catch (error) {
        setResponse(undefined)
        setError(error as AxiosError)
        onError?.(error as AxiosError)
      }
      setLoading(false)
    },
    [request]
  )

  useEffect(() => {
    if (!callOnMount) return
    call()
  }, [])
  //todo: convert it to array so it would useable as many time as needed in one component
  return {
    isLoading,
    response: response?.data,
    responseFull: response,
    error,
    call: call,
  }
}
