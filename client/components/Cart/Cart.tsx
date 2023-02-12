import React, { useEffect, useState } from 'react'
import CartItem from '../CartItem/CartItem'
import s from './Cart.module.scss'
import { IoClose as CloseButton } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '../../utils/store'
import { fetchCart } from '../../services/cart/cart.thunks'

type Props = {
  isOpen: boolean
  closeHandler: () => void
}

//TODO: separate list (new component or custom hook)
const Cart: React.FC<Props> = ({ isOpen, closeHandler }) => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(state => state.cart.data)

  useEffect(() => {
    dispatch(fetchCart())
  }, [])

  const finalizeOrderHandler = () => {}

  return (
    <div className={isOpen ? s['open'] : s['closed']}>
      <div className={s['top']}>
        <span className={s['close-button']} onClick={closeHandler}>
          <CloseButton style={{ fontSize: '28px' }} />
        </span>
        <span className={s['label']}>سبد خرید</span>
      </div>
      <div className={s['list']}>
        {items ? (
          items.map(cartItem => {
            return (
              <CartItem
                key={cartItem.storageItem}
                productId={cartItem.productId}
                storageItemId={cartItem.storageItem}
                quantity={cartItem.quantity}
                productName={cartItem.productName}
                price={cartItem.price}
              />
            )
          })
        ) : (
          <div className={s['alter']}>
            <span className={s['alter-text']}>
              هنوز محصولی به سبد خرید اضافه نکردید
            </span>
          </div>
        )}
      </div>
      <div className={s.order}>
        <div className={s['order-button']} onClick={finalizeOrderHandler}>
          نهایی کردن خرید
        </div>
      </div>
    </div>
  )
}

export default React.memo(Cart)
