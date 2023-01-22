import s from './Cart.module.css'
import { TbTrash as TrashIcon } from 'react-icons/tb'
import { BsPlus as PlusIcon } from 'react-icons/bs'
import { BiMinus as MinusIcon } from 'react-icons/bi'

type Props = {
  storageItem: string
  quantity: number
}

const CartItem: React.FC<Props> = ({ storageItem, quantity }) => {
  return (
    <div className={s['cart-item']}>
      <div className={s.right}>
        <div className={s.picture}>a{/* <img src=""></img> */}</div>
      </div>
      <div className={s.left}>
        <div className={s.top}>
          <div className={s.name}>piaz jafari</div>
          <div className={s.remove}>
            <TrashIcon style={{ fontSize: '20px' }} />
          </div>
        </div>
        <div className={s.bottom}>
          <div className={s.price}>199 toman</div>
          <div className={s['quantity-box']}>
            <div className={s['quantity-icon']}>
              <PlusIcon style={{ fontSize: '16px' }} />
            </div>
            <div className={s.quantity}>1 </div>
            <div className={s['quantity-icon']}>
              <MinusIcon style={{ fontSize: '14px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
