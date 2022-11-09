import express, { Express } from 'express'
import cors from 'cors'
import router from './routes/index'

const app: Express = express()

app.use(express.json())
app.use(cors())
app.use(router)

export default app
