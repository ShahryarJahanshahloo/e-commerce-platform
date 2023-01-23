import s from './Seller.module.css'
import { TbTrash as TrashIcon } from 'react-icons/tb'
import { BsPlus as PlusIcon } from 'react-icons/bs'
import { BiMinus as MinusIcon } from 'react-icons/bi'
import Image from 'next/image'
import { HiStar as StarIcon } from 'react-icons/hi'

type Props = {
  storageItem: string
  price: number
  sellerName: string
  sellerRate: number
}

const SellerItem: React.FC<Props> = ({
  storageItem,
  price,
  sellerName,
  sellerRate,
}) => {
  return (
    <div className={s['seller-item']}>
      <div className={s.top}>
        <div className={s.name}>{sellerName}</div>
        <div className={s['rate-box']}>
          <div className={s.star}>
            <StarIcon style={{ fontSize: '16px', color: '#f9bc00' }} />
          </div>
          <div className={s.rate}>{sellerRate}</div>
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s['price-box']}>
          <div className={s.price}>{price}</div>
          <div className={s.unit}>تومان</div>
        </div>
        <div className={s['button-wrapper']}>
          <div className={s.button}>افزودن به سبد خرید</div>
        </div>
      </div>
    </div>
  )
}

export default SellerItem
