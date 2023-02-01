import s from './Search.module.sass'
import { IoClose as CloseButton } from 'react-icons/io5'

type Props = {
  isOpen: boolean
  closeHandler: () => void
}

const Search: React.FC<Props> = ({ isOpen, closeHandler }) => {
  return (
    <div className={isOpen ? s['wrapper-open'] : s['wrapper-closed']}>
      <div className={s.inner}>
        <div className={s.flex}>
          <div className={s['close-button-wrapper']} onClick={closeHandler}>
            <CloseButton style={{ fontSize: '28px', color: '#45424E' }} />
          </div>
          <input className={s.input} placeholder='نام محصول یا دسته بندی' />
        </div>
        <div className={s.dropdown}>
          <div className={s['dropdown-inner']}></div>
        </div>
      </div>
    </div>
  )
}

export default Search
