import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as FeatureValueService from '../../services/featureValue/featureValue.service'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const featureValue = await FeatureValueService.create(req.body)
    res.status(201).send(featureValue)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/:featureValueId', async (req, res) => {
  try {
    const featureValue = await FeatureValueService.findById(
      req.params.featureValueId
    )
    res.send(featureValue)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/:featureValueId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const featureValue = await FeatureValueService.findAndUpdate(
      req.params.featureValueId,
      req.body
    )
    res.send(featureValue)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
