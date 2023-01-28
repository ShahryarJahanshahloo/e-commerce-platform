import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'

import MainCategory from '../Category/MainCategory'
import { GetMainCategories } from '../../api/category/mainCategory.api'
import { ApiCategory } from '../../api/entities'

import s from './Menu.module.css'
import { IoClose as CloseButton } from 'react-icons/io5'

type Props = {
  isOpen: boolean
  closeHandler: () => void
}

//TODO: separate list (new component or customer hook)
const Menu: React.FC<Props> = ({ isOpen, closeHandler }) => {
  const router = useRouter()
  const [mainCategories, setMainCategories] = useState<ApiCategory[]>()

  const redirectToLogin = () => {
    router.push('/login')
  }

  const redirectToSignup = () => {
    router.push('/signup')
  }

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
        <div className={s.auth}>
          <span className={s.login} onClick={redirectToLogin}>
            وارد شوید
          </span>
          <span className={s.separator}>|</span>
          <span className={s.signup} onClick={redirectToSignup}>
            عضویت
          </span>
        </div>
        <div className={s.categories}>
          {mainCategories
            ? mainCategories.map(mainCategory => {
                return (
                  <MainCategory
                    key={mainCategory._id}
                    id={mainCategory._id}
                    name={mainCategory.name}
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
