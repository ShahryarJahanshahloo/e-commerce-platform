import { useEffect, useState } from 'react'
import Image from 'next/image'

import { ApiProductPublic } from '../../api/product/entities'

import s from '../../styles/product.module.scss'

const ProductPage = () => {
  // const router = useRouter()
  // const { id } = router.query
  const [info, setInfo] = useState<ApiProductPublic>()

  useEffect(() => {
    const data = {
      _id: 'af2153ffa1341s',
      name: ',',
      description: 'string',
      category: 'string',
      views: 13,
      features: [],
      sold: 14,
      price: 5233,
    }
    setInfo(data)
  }, [])

  return (
    <div className={s.flex}>
      <div className={s['image-wrapper']}>
        <Image
          src='/images/coffee.jpg'
          alt='coffee'
          width='0'
          height='0'
          sizes='100vw'
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className={s.info}></div>
      <div className={s['add-to-cart']}>
        <div className={s.button}>افزودن به سبد خرید</div>
      </div>
      <div className={s.title}>معرفی</div>
      <div className={s.description}></div>
      <div className={s.title}>ویژگی ها</div>
      <div className={s.features}></div>
      <div className={s.title}>دیدگاه ها</div>
      <div className={s.comments}></div>
    </div>
  )
}

export default ProductPage
