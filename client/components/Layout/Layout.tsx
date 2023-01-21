import React from 'react'

import s from './Layout.module.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = props => {
  return (
    <div className={s.layout}>
      <Header />
      <div className={s.main}>{props.children}</div>
      <Footer />
    </div>
  )
}

export default Layout
