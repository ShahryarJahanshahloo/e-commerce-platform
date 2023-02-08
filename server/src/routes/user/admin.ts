import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as AdminService from '../../services/user/admin.service'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const admin = await AdminService.create(req.body)
    res.status(201).send(admin)
  } catch (error) {
    res.status(400).send()
  }
})

router.get('/me', auth([userRoles.Admin]), async (req, res) => {
  try {
    const admin = await AdminService.findById(req.user.id)
    res.send(admin)
  } catch (error) {
    res.status(400).send()
  }
})

router.patch('/me', auth([userRoles.Admin]), async (req, res) => {
  try {
    const admin = await AdminService.findAndUpdate(req.user.id, req.body)
    res.send(admin)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
