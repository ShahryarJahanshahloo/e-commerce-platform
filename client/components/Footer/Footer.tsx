import s from './Footer.module.scss'
import { AiOutlineInstagram as InstagramIcon } from 'react-icons/ai'
import { AiOutlineTwitter as TwitterIcon } from 'react-icons/ai'
import { FaTelegram as TelegramICon } from 'react-icons/fa'
import Phone from '../Phone/Phone'
import Enamad from '../Enamad/Enamad'

const iconStyle = {
  color: '#848488',
  fontSize: '20px',
}

const Footer: React.FC = props => {
  return (
    <div className={s.footer}>
      <div className={s['menu-bar']}>
        <div className={s['menu-inner']}>
          <div className={s['menu-item']}>پرسشهای متداول</div>
          <div className={s['menu-item']}>تماس با ما</div>
          <div className={s['menu-item']}>روشهای پرداخت</div>
          <div className={s['menu-item']}>قوانین و مقررات</div>
          <div className={s['menu-item']}>درباره ما</div>
        </div>
      </div>
      <div className={s.inner}>
        <div className={s['inner-right']}>
          <div className={s.social}>
            <InstagramIcon style={iconStyle} />
            <TwitterIcon style={iconStyle} />
            <TelegramICon style={iconStyle} />
          </div>
          <div className={s['phone-wrapper']}>
            <Phone />
          </div>
        </div>
        <div className={s['enamad-wrapper']}>
          <Enamad />
        </div>
      </div>
    </div>
  )
}

export default Footer
