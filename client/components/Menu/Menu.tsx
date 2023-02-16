import React, { useEffect } from 'react'
import { useState } from 'react'
import Category from '../Category/Category'
import { ApiCategory } from '../../services/category/category.entities'
import s from './Menu.module.scss'
import { IoClose as CloseButton } from 'react-icons/io5'
import Auth from '../Auth/Auth'

type Props = {
  isOpen: boolean
  closeHandler: () => void
}

//TODO: separate list (new component or customer hook)
const Menu: React.FC<Props> = ({ isOpen, closeHandler }) => {
  const [mainCategories, setMainCategories] = useState<ApiCategory[]>()

  useEffect(() => {
    const fetch = async () => {
      // const { data } = await GetMainCategories()
      const data = [
        {
          type: 'Main',
          name: 'دسته بندی ۱',
          isActive: true,
          _id: 'aasdasd1231',
        },
        {
          type: 'Main',
          name: 'دسته بندی ۲',
          isActive: true,
          _id: 'aasdasd1232',
        },
        {
          type: 'Main',
          name: 'دسته بندی ۳',
          isActive: true,
          _id: 'aasdasd1233',
        },
        {
          type: 'Main',
          name: 'دسته بندی ۴',
          isActive: true,
          _id: 'aasdasd1234',
        },
      ]
      setMainCategories(data)
    }
    fetch()
  }, [])

  return (
    <div className={s['menu-wrapper']}>
      <div className={isOpen ? s['menu-open'] : s['menu-closed']}>
        <span className={s.close} onClick={closeHandler}>
          <CloseButton style={{ fontSize: '32px' }} />
        </span>
        <Auth />
        <div className={s.categories}>
          {mainCategories
            ? mainCategories.map(mainCategory => {
                return (
                  <Category
                    key={mainCategory._id}
                    id={mainCategory._id}
                    name={mainCategory.name}
                    isChild={false}
                  />
                )
              })
            : null}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Menu)
