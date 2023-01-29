import s from './Sort.module.css'
import { IoClose as CloseButton } from 'react-icons/io5'

type Props = {
  isOpen: boolean
  closeHandler: () => void
}

const Sort: React.FC<Props> = ({ isOpen, closeHandler }) => {
  return (
    <div className={isOpen ? s['modal-open'] : s['modal-closed']}>
      <div className={isOpen ? s['inner-open'] : s['inner-closed']}>
        <div className={s.flex}>
          <div className={s.top}>
            <div className={s.close}>
              <div className={s['close-button']} onClick={closeHandler}>
                <CloseButton style={{ fontSize: '24px', color: '#35364b' }} />
              </div>
            </div>
            <div className={s.title}>مرتب سازی بر اساس</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sort
