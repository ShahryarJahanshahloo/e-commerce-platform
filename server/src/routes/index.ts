import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/ping', (req, res) => {
  res.send({ message: 'pong' })
})

export default router
