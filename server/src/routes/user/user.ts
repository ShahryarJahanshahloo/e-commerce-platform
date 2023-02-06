import express from 'express'
import User from '../../models/user/user'
import { TypedRequestBody } from '../../TypedRequestBody'
import auth from '../../middlewares/auth'
import customerRouter from './customer'
import adminRouter from './admin'
import sellerRouter from './seller'

const router = express.Router()

router.use('/customer', customerRouter)
router.use('/admin', adminRouter)
router.use('/seller', sellerRouter)

router.post(
  '/login',
  async (req: TypedRequestBody<{ email: string; password: string }>, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      )
      if (!user) return res.status(404).send()
      const token = await user.generateAccessToken()
      res.send({ user, token })
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  }
)

router.post('/authenticate', auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (user === null) return res.status(401).send()
    res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.post('/logout', auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (user == null) return res.status(400).send()
    user.tokens = user.tokens.filter(token => {
      return token.token != req.token
    })
    await user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post('/logout/all', auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (user == null) return res.status(400).send()
    user.tokens = []
    await user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

export default router
