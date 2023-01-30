import React, { useEffect, useState } from 'react'

import CartItem from '../CartItem/CartItem'
import { ApiCartItem } from '../../api/user/entities'

import s from './Cart.module.css'
import { IoClose as CloseButton } from 'react-icons/io5'

type Props = {
  isOpen: boolean
  closeHandler: () => void
}

//TODO: separate list (new component or custom hook)
const Cart: React.FC<Props> = ({ isOpen, closeHandler }) => {
  const [items, setItems] = useState<ApiCartItem[]>()

  useEffect(() => {
    //this line might cause issues!
    if (!isOpen) return

    // const { data } = await GetCart()
    const data = [
      {
        storageItem: '1asduih1u23',
        quantity: 1,
      },
      {
        storageItem: 'as2duih1u23123',
        quantity: 3,
      },
      {
        storageItem: 'asdu3ih1u665723',
        quantity: 4,
      },
      {
        storageItem: 'asduih41u665723',
        quantity: 4,
      },
      {
        storageItem: 'asdu5ih1u665723',
        quantity: 4,
      },
    ]
    setItems(data)
  }, [isOpen])

  const finalizeOrderHandler = () => {}

  return (
    <div className={isOpen ? s['open'] : s['closed']}>
      <div className={s['top']}>
        <div className={s['close-button-wrapper']}>
          <span className={s['close-button']} onClick={closeHandler}>
            <CloseButton style={{ fontSize: '28px' }} />
          </span>
        </div>
        <span className={s['label']}>سبد خرید</span>
      </div>
      <div className={s['list']}>
        {items ? (
          items.map(cartItem => {
            return (
              <CartItem
                key={cartItem.storageItem}
                storageItem={cartItem.storageItem}
                quantity={cartItem.quantity}
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
