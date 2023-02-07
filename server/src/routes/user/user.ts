import express from 'express'
import auth from '../../middlewares/auth'
import * as UserService from '../../services/user/user.service'

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await UserService.login(req.body)
    res.send({ user, token })
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/authenticate', auth(), async (req, res) => {
  try {
    const user = await UserService.authenticate(req.user.id)
    res.send(user)
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/logout', auth(), async (req, res) => {
  try {
    const user = await UserService.logout(req.user.id, req.token)
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post('/logout/all', auth(), async (req, res) => {
  try {
    const user = await UserService.logoutAll(req.user.id)
    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})

export default router
