import React from 'react'
import s from './Sort.module.scss'

type Props = {
  isOpen: boolean
  closeHandler: () => void
}

const Filter: React.FC<Props> = ({ isOpen, closeHandler }) => {
  return <div></div>
}

export default React.memo(Filter)
