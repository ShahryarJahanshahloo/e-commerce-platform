import { useEffect } from 'react'
import { useAppSelector } from '../utils/store'
import { fetchCart } from '../services/cart/cart.thunks'
import useThunk from '../hooks/useThunk'
import Loading from '../components/Loading/Loading'

const HomePage = () => {
  const cart = useAppSelector(state => state.cart.data)
  const { isLoading, sendRequest } = useThunk(fetchCart)

  useEffect(() => {
    sendRequest()
  }, [])

  return (
    <>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          cart?.map(item => (
            <div key={item.storageItem}>{item.productName}</div>
          ))
        )}
      </div>
    </>
  )
}

export default HomePage
