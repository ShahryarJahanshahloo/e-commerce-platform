import axios from 'axios'
import { useEffect, useState } from 'react'
import { FC } from 'react'

const Home: FC = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:3001/ping',
      })
      setMessage(res.data.message)
    }
    fetch()
  }, [])

  return (
    <div>
      <div>{message}</div>
    </div>
  )
}

export default Home
