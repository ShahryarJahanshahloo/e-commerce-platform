import { useMemo } from 'react'
import s from './Category.module.scss'
import {
  IoIosArrowUp as UpArrowIcon,
  IoIosArrowDown as DownArrowIcon,
} from 'react-icons/io'
import { ApiCategory } from '../../services/category/category.entities'
import useMenu from '../../hooks/useMenu'
import Link from 'next/link'

type Props = {
  id: string
  name: string
  isChild: boolean
}

const Category: React.FC<Props> = ({ id, name, isChild }) => {
  const [isOpen, openHandler, closeHandler] = useMenu()
  const children = useMemo(() => {
    if (isOpen === false) return null
    // const { data } = await GetChildren(key)
    const data = [
      {
        type: 'Leaf',
        name: 'دسته بندی 10',
        isActive: true,
        _id: 'aasdasd1231',
      },
      {
        type: 'Middle',
        name: 'دسته بندی 11',
        isActive: true,
        _id: 'aasdasd1232',
      },
      {
        type: 'Middle',
        name: 'دسته بندی 12',
        isActive: true,
        _id: 'aasdasd1233',
      },
      {
        type: 'Middle',
        name: 'دسته بندی 13',
        isActive: true,
        _id: 'aasdasd1234',
      },
    ]
    return data
  }, [isOpen])

  return (
    <div className={isChild ? s['category-child'] : s['category-nonchild']}>
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
              if (child.type === 'Middle')
                return (
                  <Category
                    key={child._id}
                    id={child._id}
                    name={child.name}
                    isChild
                  />
                )
              if (child.type === 'Leaf')
                return (
                  <Link
                    href={`/category/${child._id}`}
                    key={child._id}
                    className={s.leaf}
                  >
                    <div className={s.name}>{child.name}</div>
                  </Link>
                )
            })
          : null}
      </div>
    </div>
  )
}

export default Category
