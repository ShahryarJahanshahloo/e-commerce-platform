import Image from 'next/image'
import { ApiProductPublic } from '../../services/product/product.entities'
import s from '../../styles/product.module.scss'
import { GetAllIds, GetProduct } from '../../services/product/product.api'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

const ProductPage: NextPage<ApiProductPublic> = props => {
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

export const getStaticProps: GetStaticProps<
  ApiProductPublic
> = async context => {
  const res = await GetProduct(context.params.id as string)

  return {
    props: res.data,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await GetAllIds()
  const paths = res.data.map(product => ({ params: { id: product._id } }))
  return { paths, fallback: false }
}

export default ProductPage
