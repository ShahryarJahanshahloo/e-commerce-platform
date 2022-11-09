const express = require('express')
const app = express()

const PORT = 3001 | process.env.PORT

app.get('/', (req, res) => {
  res.send('mamad is here')
})

app.listen(PORT, () => {
  console.log('server up and running...')
})
