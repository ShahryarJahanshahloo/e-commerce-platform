import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import Cart from '../Cart/Cart'
import Menu from '../Menu/Menu'

import s from './Header.module.css'
import { AiOutlineMenu as MenuIcon } from 'react-icons/ai'
import { FiSearch as SearchIcon } from 'react-icons/fi'
import { GrCart as CartIcon } from 'react-icons/gr'
import { FiUser as UserIcon } from 'react-icons/fi'

const iconStyle = {
  fontSize: '20px',
}

const Header: React.FC = props => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)

  const openMenuHandler = () => {
    setIsMenuOpen(true)
  }

  const closeMenuHandler = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const redirectToHome = () => {
    router.push('/')
  }

  const openCartModalHandler = async () => {
    setIsCartModalOpen(true)
  }

  const closeCartModalHandler = useCallback(() => {
    setIsCartModalOpen(false)
  }, [])

  return (
    <div className={s.header}>
      <div className={s.inner}>
        <div className={s['inner-flex']}>
          <div className={s['left-side']}>
            <div className={s['mini-cart']} onClick={openCartModalHandler}>
              <a>
                <CartIcon style={iconStyle} />
              </a>
            </div>
            <Cart
              isOpen={isCartModalOpen}
              closeHandler={closeCartModalHandler}
            />
            <div className={s['search-wrapper']}>
              <a>
                <SearchIcon style={iconStyle} />
              </a>
            </div>
            <div className={s['user-auth']}></div>
          </div>
          <div className={s.logo} onClick={redirectToHome}>
            LOGO
          </div>
          <div className={s['right-side']}>
            <a onClick={openMenuHandler}>
              <MenuIcon style={iconStyle} />
            </a>
          </div>
        </div>
      </div>
      <Menu isOpen={isMenuOpen} closeHandler={closeMenuHandler} />
    </div>
  )
}

export default Header
