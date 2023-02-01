import Image from 'next/image'
import s from './Footer.module.scss'
import { AiOutlineInstagram as InstagramIcon } from 'react-icons/ai'
import { AiOutlineTwitter as TwitterIcon } from 'react-icons/ai'
import { FaTelegram as TelegramICon } from 'react-icons/fa'
import { GiRotaryPhone as PhoneIcon } from 'react-icons/gi'

const iconStyle = {
  color: '#848488',
  fontSize: '20px',
}

const Footer: React.FC = props => {
  return (
    <div className={s.footer}>
      <div className={s['menu-bar']}>
        <div className={s['menu-item']}>پرسشهای متداول</div>
        <div className={s['menu-item']}>تماس با ما</div>
        <div className={s['menu-item']}>روشهای پرداخت</div>
        <div className={s['menu-item']}>قوانین و مقررات</div>
        <div className={s['menu-item']}>درباره ما</div>
      </div>
      <div className={s.inner}>
        <div className={s.social}>
          <div className={s['icon-wrapper']}>
            <InstagramIcon style={iconStyle} />
          </div>
          <div className={s['icon-wrapper']}>
            <TwitterIcon style={iconStyle} />
          </div>
          <div className={s['icon-wrapper']}>
            <TelegramICon style={iconStyle} />
          </div>
        </div>
        <div className={s.phone}>
          <div className={s['phone-number']}>09131234567</div>
          <div className={s['icon-wrapper']}>
            <PhoneIcon style={iconStyle} />
          </div>
        </div>
        <div className={s['enamad']}>
          <Image
            src='/images/enamad.png'
            alt='enamad'
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
