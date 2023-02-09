import { useEffect, useState, ChangeEvent, useCallback } from 'react'
import useRequest from '../../hooks/useRequest'
import { SearchProducts } from '../../services/product/product.api'
import s from './Search.module.scss'
import { IoClose as CloseButton } from 'react-icons/io5'
import debounce from 'lodash.debounce'

type Props = {
  isOpen: boolean
  closeHandler: () => void
}

const Search: React.FC<Props> = ({ isOpen, closeHandler }) => {
  const [query, setQuery] = useState<string>('')
  const { response, sendRequest } = useRequest(SearchProducts)

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

  return (
    <div className={isOpen ? s['wrapper-open'] : s['wrapper-closed']}>
      <div className={s.inner}>
        <div className={s.flex}>
          <div className={s['close-button-wrapper']} onClick={closeHandler}>
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
          <div className={s['dropdown-inner']}>
            {response !== undefined
              ? response.map(product => {
                  return <div key={product._id}>hello</div>
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
