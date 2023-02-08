import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import * as UserService from '../../services/user/user.service'

const router = express.Router()

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { user, token } = await UserService.login(req.body)
    res.send({ user, token })
  })
)

router.post(
  '/authenticate',
  auth(),
  asyncHandler(async (req, res) => {
    const user = await UserService.authenticate(req.user.id)
    res.send(user)
  })
)

router.post(
  '/logout',
  auth(),
  asyncHandler(async (req, res) => {
    const user = await UserService.logout(req.user.id, req.token)
    res.send(user)
  })
)

router.post(
  '/logout/all',
  auth(),
  asyncHandler(async (req, res) => {
    const user = await UserService.logoutAll(req.user.id)
    res.send(user)
  })
)

export default router
