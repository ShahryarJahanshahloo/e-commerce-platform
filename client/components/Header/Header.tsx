import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import Cart from '../Cart/Cart'
import Menu from '../Menu/Menu'
import useMenu from '../../hooks/useMenu'
import Search from '../Search/Search'

import s from './Header.module.sass'
import { AiOutlineMenu as MenuIcon } from 'react-icons/ai'
import { FiSearch as SearchIcon } from 'react-icons/fi'
import { GrCart as CartIcon } from 'react-icons/gr'
import { FiUser as UserIcon } from 'react-icons/fi'

const iconStyle = {
  fontSize: '20px',
}

const Header: React.FC = props => {
  const router = useRouter()
  const [isMenuOpen, openMenuHandler, closeMenuHandler] = useMenu()
  const [isCartOpen, openCartHandler, closeCartHandler] = useMenu()
  const [isSearchOpen, openSearchHandler, closeSearchHandler] = useMenu()

  const redirectToHome = () => {
    router.push('/')
  }

  return (
    <div className={s.header}>
      <div className={s.inner}>
        <div className={s['inner-flex']}>
          <div className={s['left-side']}>
            <div className={s['mini-cart']} onClick={openCartHandler}>
              <a>
                <CartIcon style={iconStyle} />
              </a>
            </div>
            <Cart isOpen={isCartOpen} closeHandler={closeCartHandler} />
            <div className={s['search-wrapper']} onClick={openSearchHandler}>
              <a>
                <SearchIcon style={iconStyle} />
              </a>
            </div>
            <Search isOpen={isSearchOpen} closeHandler={closeSearchHandler} />
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
