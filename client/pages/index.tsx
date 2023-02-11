import s from '../styles/home.module.scss'
import { toast } from 'react-toastify'

const HomePage = () => {
  const notify = () => toast.success('اضافه شد')
  return (
    <>
      <h1 className={s.mamad}>mamad</h1>
      <h2 onClick={notify}>Notify!</h2>
      <div>goomba</div>
      <div>goomba</div>
      <div>goomba</div>
      <div>goomba</div>
      <div>goomba</div>
      <div>goomba</div>
    </>
  )
}

export default HomePage
