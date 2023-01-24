import s from './Cart.module.css'
import { TbTrash as TrashIcon } from 'react-icons/tb'
import { BsPlus as PlusIcon } from 'react-icons/bs'
import { BiMinus as MinusIcon } from 'react-icons/bi'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  name: string
  initialQuantity: number
  price: number
  remove: () => void
}

const CartItem: React.FC<Props> = ({
  name,
  initialQuantity,
  price,
  remove,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity)

  const increaseQuantity = () => {
    //api
    setQuantity(prevState => prevState + 1)
  }

  const decreaseQuantity = () => {
    //api
    if (quantity > 1) setQuantity(prevState => prevState - 1)
  }

  return (
    <div className={s['cart-item']}>
      <div className={s.right}>
        <div className={s.picture}>
          <Image
            src='/images/coffee.jpg'
            alt='coffee'
            style={{ width: '100%', height: 'auto' }}
            width={0}
            height={0}
            sizes='100vw'
          />
        </div>
      </div>
      <div className={s.left}>
        <div className={s.top}>
          <div className={s.name}>{name}</div>
          <div className={s.remove} onClick={() => remove()}>
            <TrashIcon style={{ fontSize: '20px' }} />
          </div>
        </div>
        <div className={s.bottom}>
          <div className={s['price-box']}>
            <div className={s.price}>{price}</div>
            <div className={s.unit}>تومان</div>
          </div>
          <div className={s['quantity-box']}>
            <div className={s['quantity-icon']} onClick={increaseQuantity}>
              <PlusIcon style={{ fontSize: '16px' }} />
            </div>
            <div className={s.quantity}>{quantity}</div>
            <div className={s['quantity-icon']} onClick={decreaseQuantity}>
              <MinusIcon style={{ fontSize: '14px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
