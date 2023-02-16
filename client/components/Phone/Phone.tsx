import s from './Phone.module.scss'
import { GiRotaryPhone as PhoneIcon } from 'react-icons/gi'

const iconStyle = {
  color: '#848488',
  fontSize: '20px',
}

const Phone: React.FC = () => {
  return (
    <div className={s.phone}>
      <div className={s['phone-number']}>09131234567</div>
      <div className={s['icon-wrapper']}>
        <PhoneIcon style={iconStyle} />
      </div>
    </div>
  )
}

export default Phone
