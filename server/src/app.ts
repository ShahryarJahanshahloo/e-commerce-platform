import express from 'express'
import cors from 'cors'
import router from './routes/index'
import errorHandler from './middlewares/errorHandler'
import errorLogger from './middlewares/errorLogger'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(errorLogger)
app.use(errorHandler)

export default app
