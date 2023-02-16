import s from './Phone.module.scss'
import { GiRotaryPhone as PhoneIcon } from 'react-icons/gi'

const iconStyle = {
  color: '#848488',
  fontSize: '20px',
}

type Props = {
  dark?: boolean
}

const Phone: React.FC<Props> = ({ dark = false }) => {
  return (
    <div className={s.phone}>
      <span className={s['phone-number']}>09131234567</span>
      <span className={s['icon-wrapper']}>
        <PhoneIcon style={iconStyle} />
      </span>
    </div>
  )
}

export default Phone
