import { useRouter } from 'next/router'
import s from './Auth.module.scss'

const Auth: React.FC = () => {
  const router = useRouter()

  const redirectToLogin = () => {
    router.push('/login')
  }

  const redirectToSignup = () => {
    router.push('/signup')
  }

  return (
    <div className={s.auth}>
      <span onClick={redirectToLogin}>وارد شوید</span>
      <span className={s.separator}>|</span>
      <span onClick={redirectToSignup}>عضویت</span>
    </div>
  )
}

export default Auth
