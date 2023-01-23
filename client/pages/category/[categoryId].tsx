import axios from 'axios'
import { useEffect, useState } from 'react'
import { FC } from 'react'
import Layout from '../../components/Layout/Layout'
import { BiSortDown as SortIcon } from 'react-icons/bi'
import { GoSettings as FilterIcon } from 'react-icons/go'
import s from '../../styles/category.module.css'
import { ApiProduct, ApiProductCart } from '../../api/entities'
import Router, { useRouter } from 'next/router'
import { GetProductsByCategory } from '../../api/product/product.api'
import Product from '../../components/Product/Product'

const Category: FC = () => {
  const router = useRouter()
  const { categoryId } = router.query
  const [products, setProducts] = useState<ApiProductCart[]>()

  useEffect(() => {
    const fetch = async () => {
      // const { data } = await GetProductsByCategory(categoryId as string, {})
      const data = [
        {
          _id: 'ciga1731aosfh123',
          name: 'قهوه مشتی قهوه ای رنگ',
          price: 200,
          rate: 4.2,
        },
        {
          _id: 'ciga1731aosfh1213',
          name: 'قهوه سوپر مشتی خیلی قهوه ای رنگ تلخ آشغال بی مزه',
          price: 200,
          rate: 4.2,
        },
        {
          _id: 'ciga1731aosfh1123',
          name: 'mamad',
          price: 200,
          rate: 4.2,
        },
        {
          _id: 'ciga17321aosfh123',
          name: 'mamad',
          price: 200,
          rate: 4.2,
        },
        {
          _id: 'ciga1731a3osfh123',
          name: 'mamad',
          price: 200,
          rate: 4.2,
        },
      ]
      setProducts(data)
    }
    fetch()
  }, [])

  return (
    <Layout>
      <div className={s.flex}>
        <div className={s.options}>
          <div className={s['option-wrapper']}>
            <div className={s['option-icon']}>
              <FilterIcon style={{ fontSize: '24px' }} />
            </div>
            <div className={s['option-label']}>فیلتر</div>
          </div>
          <div className={s['option-wrapper']}>
            <div className={s['option-icon']}>
              <SortIcon style={{ fontSize: '24px' }} />
            </div>
            <div className={s['option-label']}>مرتب سازی</div>
          </div>
        </div>
        <div className={s.list}>
          {products
            ? products.map(product => {
                return (
                  <Product
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    rate={product.rate}
                  />
                )
              })
            : null}
        </div>
      </div>
    </Layout>
  )
}

export default Category
