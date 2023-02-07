import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as FeatureService from '../../services/feature/feature.service'

const router = express.Router()

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const feature = await FeatureService.create(req.body)
    res.status(201).send(feature)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/:featureId', async (req, res) => {
  try {
    const feature = await FeatureService.findById(req.params.featureId)
    res.send(feature)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/:featureId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const feature = await FeatureService.findAndUpdate(
      req.params.featureId,
      req.body
    )
    res.send(feature)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
