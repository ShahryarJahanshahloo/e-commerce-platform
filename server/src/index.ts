import http from 'http'
import dotenv from 'dotenv'
import * as customReq from './custom'
import * as envTypes from './environment'
dotenv.config()

import app from './app'
import startDBConnection from './db/connection'

const server = http.createServer(app)

const PORT = process.env.PORT || 3001

server.listen(PORT, async () => {
  console.log('server running on port: ' + PORT)
  await startDBConnection()
})
