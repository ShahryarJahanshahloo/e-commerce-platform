import { useState } from 'react'
import s from './Category.module.css'
import {
  IoIosArrowUp as UpArrowIcon,
  IoIosArrowDown as DownArrowIcon,
} from 'react-icons/io'
import { ApiCategory } from '../../api/category/entities'
import LeafCategory from './LeafCategory'

type Props = {
  id: string
  name: string
}

const MiddleCategory: React.FC<Props> = ({ id, name }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [children, setChildren] = useState<ApiCategory[]>()

  const openHandler = async () => {
    // const { data } = await GetChildren(key)
    const data = [
      {
        type: 'Leaf',
        name: 'دسته بندی 21',
        isActive: true,
        _id: 'aasdasd1231',
      },
      {
        type: 'Leaf',
        name: 'دسته بندی 22',
        isActive: true,
        _id: 'aasdasd1232',
      },
      {
        type: 'Leaf',
        name: 'دسته بندی 23',
        isActive: true,
        _id: 'aasdasd1233',
      },
      {
        type: 'Leaf',
        name: 'دسته بندی 24',
        isActive: true,
        _id: 'aasdasd1234',
      },
    ]
    setChildren(data)
    setIsOpen(true)
  }

  const closeHandler = () => {
    setIsOpen(false)
  }

  return (
    <div className={s['middle-category']}>
      <div className={s.upper}>
        <div className={s.name}>{name}</div>
        <div className={s.button}>
          {isOpen ? (
            <UpArrowIcon onClick={closeHandler} />
          ) : (
            <DownArrowIcon onClick={openHandler} />
          )}
        </div>
      </div>
      <div className={isOpen ? s['children-open'] : s['children-closed']}>
        {children
          ? children.map(child => {
              if (child.type == 'Leaf')
                return (
                  <LeafCategory
                    key={child._id}
                    id={child._id}
                    name={child.name}
                  />
                )
            })
          : null}
      </div>
    </div>
  )
}

export default MiddleCategory
