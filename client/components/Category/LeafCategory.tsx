import s from './Category.module.css'

type Props = {
  key: string
  name: string
}

const LeafCategory: React.FC<Props> = ({ key, name }) => {
  return (
    <div className={s['leaf-category']}>
      <div className={s.upper}>
        <div className={s.name}>{name}</div>
      </div>
    </div>
  )
}

export default LeafCategory
