import s from './Header.module.css'
import { useEffect, useState } from 'react'
import { AiOutlineMenu as MenuIcon } from 'react-icons/ai'
import { FiSearch as SearchIcon } from 'react-icons/fi'
import { GrCart as CartIcon } from 'react-icons/gr'
import { FiUser as UserIcon } from 'react-icons/fi'
import { IoClose as CloseButton } from 'react-icons/io5'
import { GetMainCategories } from '../../api/category/mainCategory.api'
import { ApiCategory } from '../../api/entities'
import MainCategory from '../Category/MainCategory'

const iconStyle = {
  fontSize: '20px',
}

const Header: React.FC = props => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mainCategories, setMainCategories] = useState<ApiCategory[]>()

  const openMenuHandler = () => {
    setIsMenuOpen(true)
  }

  const closeMenuHandler = () => {
    setIsMenuOpen(false)
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
    <div className={s.header}>
      <div className={s.inner}>
        <div className={s['inner-flex']}>
          <div className={s['left-side']}>
            <div className={s['mini-cart']}>
              <a>
                <CartIcon style={iconStyle} />
              </a>
            </div>
            <div className={s['search-wrapper']}>
              <a>
                <SearchIcon style={iconStyle} />
              </a>
            </div>
            <div className={s['user-auth']}></div>
          </div>
          <div className={s.logo}>LOGO</div>
          <div className={s['right-side']}>
            <a onClick={openMenuHandler}>
              <MenuIcon style={iconStyle} />
            </a>
          </div>
        </div>
      </div>
      <div className={s['menu-wrapper']}>
        <div className={isMenuOpen ? s['menu-open'] : s['menu-closed']}>
          <span className={s.close} onClick={closeMenuHandler}>
            <CloseButton style={{ fontSize: '32px' }} />
          </span>
          <div className={s.auth}>عضویت | وارد شوید</div>
          <div className={s.categories}>
            {mainCategories
              ? mainCategories.map(mainCategory => {
                  return (
                    <MainCategory
                      key={mainCategory._id}
                      name={mainCategory.name}
                    />
                  )
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
