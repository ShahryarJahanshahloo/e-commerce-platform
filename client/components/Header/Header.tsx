import { useRouter } from 'next/router'
import Cart from '../Cart/Cart'
import Menu from '../Menu/Menu'
import useMenu from '../../hooks/useMenu'
import Search from '../Search/Search'
import s from './Header.module.scss'
import { AiOutlineMenu as MenuIcon } from 'react-icons/ai'
import { FiSearch as SearchIcon } from 'react-icons/fi'
import { GrCart as CartIcon } from 'react-icons/gr'
import Auth from '../Auth/Auth'
import Phone from '../Phone/Phone'
import Image from 'next/image'
import logoPic from '../../public/images/logo.png'

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
            <div className={s['auth-wrapper']}>
              <Auth />
            </div>
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
          </div>
          <div className={s.middle}>
            <div className={s.logo} onClick={redirectToHome}>
              <Image src={logoPic} alt='logo' className={s['logo-img']} />
            </div>
          </div>
          <div className={s['right-side']}>
            <a className={s['menu-icon-wrapper']} onClick={openMenuHandler}>
              <MenuIcon style={iconStyle} />
            </a>
            <div className={s['phone-wrapper']}>
              <Phone />
            </div>
          </div>
        </div>
      </div>
      <Menu isOpen={isMenuOpen} closeHandler={closeMenuHandler} />
    </div>
  )
}

export default Header
