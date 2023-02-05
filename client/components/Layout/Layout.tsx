import React, { useEffect } from 'react'
import { useAppDispatch } from '../../utils/store'
import { Authenticate } from '../../services/user/user.thunks'

import s from './Layout.module.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(Authenticate())
  }, [])

  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
