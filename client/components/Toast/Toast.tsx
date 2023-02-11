import { ToastContainer, Slide } from 'react-toastify'
import s from './Toast.module.scss'

const Toast: React.FC = () => {
  return (
    <ToastContainer
      position='bottom-center'
      toastClassName={s.wrapper}
      className={s.container}
      bodyClassName={s.body}
      autoClose={3000}
      transition={Slide}
      hideProgressBar
      pauseOnFocusLoss
      rtl
      draggable={false}
      closeButton={false}
      closeOnClick
    />
  )
}

export default Toast
