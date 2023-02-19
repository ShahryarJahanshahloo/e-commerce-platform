import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import { Provider } from 'react-redux'
import store from '../utils/store'
import Toast from '../components/Toast/Toast'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>)

  return (
    <Provider store={store}>
      <Toast />
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  )
}
