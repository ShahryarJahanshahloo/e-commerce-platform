import { useRouter } from 'next/router'
import Image from 'next/image'

import s from './Product.module.scss'
import { HiStar as StarIcon } from 'react-icons/hi'

type Props = {
  id: string
  name: string
  price: number
  rate: number
}

const Product: React.FC<Props> = ({ id, name, price, rate }) => {
  const router = useRouter()
  const redirectToProduct = () => {
    router.push('/product/' + id)
  }

  return (
    <div className={s.product} onClick={redirectToProduct}>
      <div className={s.right}>
        <Image src='/images/coffee.jpg' alt='coffee' width={120} height={120} />
      </div>
      <div className={s.left}>
        <div className={s.top}>{name}</div>
        <div className={s.bottom}>
          <div className={s['rate-box']}>
            <div className={s.star}>
              <StarIcon style={{ fontSize: '16px', color: '#f9bc00' }} />
            </div>
            <div className={s.rate}>{rate}</div>
          </div>
          <div className={s['price-box']}>
            <div className={s.unit}>تومان</div>
            <div className={s.price}>{price}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
