import s from './SearchItem.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'

type Props = {
  name: string
  id: string
}

const SearchItem: React.FC<Props> = ({ name, id }) => {
  const router = useRouter()

  const onClickHandler = () => {
    router.push('/product/' + id)
  }

  return (
    <div className={s.wrapper} onClick={onClickHandler}>
      <div className={s.flex}>
        <div className={s['image-wrapper']}>
          <Image src='/images/coffee.jpg' alt='coffee' width={35} height={35} />
        </div>
        <div className={s.name}>{name}</div>
      </div>
    </div>
  )
}

export default SearchItem
