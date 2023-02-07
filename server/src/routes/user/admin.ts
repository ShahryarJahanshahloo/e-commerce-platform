import express from 'express'
import Admin, { IAdmin } from '../../models/user/admin/admin.model'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import { updateByValidKeys } from '../../utils/common'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const admin = new Admin(req.body)
    await admin.save()
    await admin.generateAccessToken()
    res.status(201).send(admin)
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'invalid request' })
  }
})

router.get('/me', auth([userRoles.Admin]), async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id)
    if (admin == null) return res.status(400).send()
    res.send(admin)
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'invalid request' })
  }
})

router.patch('/me', auth([userRoles.Admin]), async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id)
    if (admin === null) return res.status(404).send()
    await updateByValidKeys(admin, req.body, [
      'name',
      'lastName',
      'phoneNumber',
    ])
    res.send(admin)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
