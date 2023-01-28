import React from 'react'

import s from './Layout.module.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
