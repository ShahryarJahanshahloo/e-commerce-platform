import Image from 'next/image'
import s from './Enamad.module.scss'

const Enamad: React.FC = () => {
  return (
    <div className={s['enamad']}>
      <Image
        src='/images/enamad.png'
        alt='enamad'
        width={100}
        height={100}
        className={s.image}
      />
    </div>
  )
}

export default Enamad
