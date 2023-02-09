import { useEffect, useState, ChangeEvent, useCallback } from 'react'
import useRequest from '../../hooks/useRequest'
import { SearchProducts } from '../../services/product/product.api'
import s from './Search.module.scss'
import { IoClose as CloseButton } from 'react-icons/io5'
import debounce from 'lodash.debounce'
import SearchItem from '../SearchItem/SearchItem'
import Loading from '../Loading/Loading'

type Props = {
  isOpen: boolean
  closeHandler: () => void
}

const Search: React.FC<Props> = ({ isOpen, closeHandler }) => {
  const [query, setQuery] = useState<string>('')
  const { isLoading, response, sendRequest } = useRequest(SearchProducts)

  const debouncedSendRequest = useCallback(
    debounce((q: string) => {
      sendRequest(q)
    }, 1000),
    []
  )

  //TODO: needs cleanup
  useEffect(() => {
    const trimmedQuery = query.trim()
    if (trimmedQuery === '') return
    debouncedSendRequest(trimmedQuery)
  }, [query])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  //TODO: needs loading
  return (
    <div className={isOpen ? s['wrapper-open'] : s['wrapper-closed']}>
      <div className={s.inner}>
        <div className={s.flex}>
          <div
            className={s['close-button-wrapper']}
            onClick={() => {
              setQuery('')
              closeHandler()
            }}
          >
            <CloseButton style={{ fontSize: '28px', color: '#45424E' }} />
          </div>
          <input
            className={s.input}
            onChange={onChangeHandler}
            value={query}
            placeholder='نام محصول یا دسته بندی'
          />
        </div>
        <div className={s.dropdown}>
          <div
            className={
              query === ''
                ? s['dropdown-inner-hidden']
                : s['dropdown-inner-visible']
            }
          >
            {isLoading ? (
              <Loading />
            ) : response?.length !== 0 ? (
              response?.map(product => {
                return (
                  <SearchItem
                    key={product._id}
                    id={product._id}
                    name={product.name}
                  />
                )
              })
            ) : (
              <div className={s.alter}>محصولی جهت نمایش وجود ندارد!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
