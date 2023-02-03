import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchCart } from '../store/slices/CartSlice'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart.data)

  useEffect(() => {
    dispatch(fetchCart())
  }, [])

  return (
    <>
      <div>
        {cart.map(item => (
          <div key={item.storageItem}>{item.productName}</div>
        ))}
      </div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
    </>
  )
}

export default HomePage
