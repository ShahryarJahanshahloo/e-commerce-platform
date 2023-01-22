import s from './Header.module.css'
import { useEffect, useState } from 'react'
import { AiOutlineMenu as MenuIcon } from 'react-icons/ai'
import { FiSearch as SearchIcon } from 'react-icons/fi'
import { GrCart as CartIcon } from 'react-icons/gr'
import { FiUser as UserIcon } from 'react-icons/fi'
import { IoClose as CloseButton } from 'react-icons/io5'
import { GetMainCategories } from '../../api/category/mainCategory.api'
import { ApiCartItem, ApiCategory } from '../../api/entities'
import MainCategory from '../Category/MainCategory'
import CartItem from '../cart/CartItem'
import { useRouter } from 'next/router'

const iconStyle = {
  fontSize: '20px',
}

const Header: React.FC = props => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [mainCategories, setMainCategories] = useState<ApiCategory[]>()
  const [cart, setCart] = useState<ApiCartItem[]>()

  const openMenuHandler = () => {
    setIsMenuOpen(true)
  }

  const closeMenuHandler = () => {
    setIsMenuOpen(false)
  }

  const redirectToLogin = () => {
    router.push('/login')
  }

  const redirectToSignup = () => {
    router.push('/signup')
  }

  const redirectToHome = () => {
    router.push('/')
  }

  const finalizeOrderHandler = () => {}

  const openCartModalHandler = async () => {
    // const { data } = await GetCart()
    const data = [
      {
        storageItem: 'asduih1u23',
        quantity: 1,
      },
      {
        storageItem: 'asduih1u23123',
        quantity: 3,
      },
      {
        storageItem: 'asduih1u665723',
        quantity: 4,
      },
      {
        storageItem: 'asduih1u665723',
        quantity: 4,
      },
      {
        storageItem: 'asduih1u665723',
        quantity: 4,
      },
    ]
    setCart(data)
    setIsCartModalOpen(true)
  }

  const closeCartModalHandler = () => {
    setIsCartModalOpen(false)
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
            <div className={s['mini-cart']} onClick={openCartModalHandler}>
              <a>
                <CartIcon style={iconStyle} />
              </a>
            </div>
            <div
              className={isCartModalOpen ? s['cart-open'] : s['cart-closed']}
            >
              <div className={s['cart-top']}>
                <div className={s['close-cart']}>
                  <span
                    className={s['close-cart-button']}
                    onClick={closeCartModalHandler}
                  >
                    <CloseButton style={{ fontSize: '28px' }} />
                  </span>
                </div>
                <span className={s['cart-label']}>سبد خرید</span>
              </div>
              <div className={s['cart-list']}>
                {cart ? (
                  cart.map(cartItem => {
                    return (
                      <CartItem
                        key={cartItem.storageItem}
                        storageItem={cartItem.storageItem}
                        quantity={cartItem.quantity}
                      />
                    )
                  })
                ) : (
                  <div className={s['cart-alter']}>
                    <span className={s['cart-alter-text']}>
                      هنوز محصولی به سبد خرید اضافه نکردید
                    </span>
                  </div>
                )}
              </div>
              <div className={s.order}>
                <div
                  className={s['order-button']}
                  onClick={finalizeOrderHandler}
                >
                  نهایی کردن خرید
                </div>
              </div>
            </div>
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
      <div className={s['menu-wrapper']}>
        <div className={isMenuOpen ? s['menu-open'] : s['menu-closed']}>
          <span className={s.close} onClick={closeMenuHandler}>
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
    </div>
  )
}

export default Header
