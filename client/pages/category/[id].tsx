import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
import { ApiProductCart } from '../../services/product/product.entities'
import { GetProductsByCategory } from '../../services/product/product.api'
import Product from '../../components/Product/Product'
import Sort from '../../components/Sort/Sort'
import Filter from '../../components/Filter/Filter'
import useMenu from '../../hooks/useMenu'
import s from '../../styles/category.module.scss'
import { BiSortDown as SortIcon } from 'react-icons/bi'
import { GoSettings as FilterIcon } from 'react-icons/go'

const CategoryPage = () => {
  // const router = useRouter()
  // const { id } = router.query
  const [products, setProducts] = useState<ApiProductCart[]>()
  const [isSortOpen, openSortHandler, closeSortHandler] = useMenu()
  const [isFilterOpen, openFilterHandler, closeFilterHandler] = useMenu()

  useEffect(() => {
    const fetch = async () => {
      // const { data } = await GetProductsByCategory(categoryId as string, {})
      const data = [
        {
          _id: 'ciga1731aosfh123',
          name: 'دسته بندی ۱',
          price: 200,
          rate: 4.2,
        },
        {
          _id: 'ciga1731aosfh1213',
          name: 'دسته بندی ۲',
          price: 200,
          rate: 4.2,
        },
        {
          _id: 'ciga1731aosfh1123',
          name: 'دسته بندی ۳',
          price: 200,
          rate: 4.2,
        },
        {
          _id: 'ciga17321aosfh123',
          name: 'دسته بندی ۴',
          price: 200,
          rate: 4.2,
        },
      ]
      setProducts(data)
    }
    fetch()
  }, [])

  return (
    <div className={s.flex}>
      <div className={s.options}>
        <div className={s['option-wrapper']}>
          <div className={s.clickable} onClick={openFilterHandler}>
            <div className={s['option-icon']}>
              <FilterIcon style={{ fontSize: '24px' }} />
            </div>
            <div className={s['option-label']}>فیلتر</div>
          </div>
          <Filter isOpen={isFilterOpen} closeHandler={closeFilterHandler} />
        </div>
        <div className={s['option-wrapper']}>
          <div className={s.clickable} onClick={openSortHandler}>
            <div className={s['option-icon']}>
              <SortIcon style={{ fontSize: '24px' }} />
            </div>
            <div className={s['option-label']}>مرتب سازی</div>
          </div>
          <Sort isOpen={isSortOpen} closeHandler={closeSortHandler} />
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
  )
}

export default CategoryPage
