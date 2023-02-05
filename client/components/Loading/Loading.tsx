import { TailSpin } from 'react-loader-spinner'
import s from './Loading.module.scss'

const Loading: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <TailSpin height='40' width='40' color='#696969' ariaLabel='loading' />
    </div>
  )
}

export default Loading
