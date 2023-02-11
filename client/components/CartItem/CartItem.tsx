import React, { MouseEvent } from 'react'
import Image from 'next/image'
import { useAppDispatch } from '../../utils/store'
import { useRouter } from 'next/router'
import s from './CartItem.module.scss'
import { TbTrash as TrashIcon } from 'react-icons/tb'
import { BsPlus as PlusIcon } from 'react-icons/bs'
import { BiMinus as MinusIcon } from 'react-icons/bi'
import { changeItemQuantity } from '../../services/cart/cart.thunks'

type Props = {
  productId: string
  quantity: number
  storageItemId: string
  productName: string
  price: number
}

const CartItem: React.FC<Props> = props => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const incrementHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(
      changeItemQuantity({
        storageItem: props.storageItemId,
        quantity: props.quantity + 1,
      })
    )
  }

  const decrementHandler = (e: MouseEvent<HTMLElement>) => {
    dispatch(
      changeItemQuantity({
        storageItem: props.storageItemId,
        quantity: props.quantity - 1,
      })
    )
  }

  const redirectHandler = () => {
    router.push(`/product/${props.productId}`)
  }

  return (
    <div className={s['cart-item']} onClick={redirectHandler}>
      <div className={s.right}>
        <div className={s['image-wrapper']}>
          <Image src='/images/coffee.jpg' alt='coffee' width={80} height={80} />
        </div>
      </div>
      <div className={s.left}>
        <div className={s.top}>
          <div className={s.name}>{props.productName}</div>
          <div className={s.remove}>
            <TrashIcon style={{ fontSize: '20px' }} />
          </div>
        </div>
        <div className={s.bottom}>
          <div className={s['price-box']}>
            <div className={s.price}>{props.price}</div>
            <div className={s.unit}>تومان</div>
          </div>
          <div className={s['quantity-box']}>
            <div className={s['quantity-icon']} onClick={incrementHandler}>
              <PlusIcon style={{ fontSize: '16px' }} />
            </div>
            <div className={s.quantity}>{props.quantity}</div>
            <div className={s['quantity-icon']} onClick={decrementHandler}>
              <MinusIcon style={{ fontSize: '14px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CartItem)
