import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import Feature, { IFeature } from '../../models/feature/feature.model'
import { updateByValidKeys } from '../../utils/common'
import featureValueRouter from './featureValue'

const router = express.Router()

router.use('/value', featureValueRouter)

router.post('/', auth([userRoles.Admin]), async (req, res) => {
  try {
    const feature = new Feature(req.body)
    await feature.save()
    res.status(201).send()
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/:featureId', async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.featureId)
    if (feature === null) return res.status(400).send()
    res.send(feature)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/:featureId', auth([userRoles.Admin]), async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.featureId)
    if (feature === null) return res.status(400).send()
    await updateByValidKeys(feature, req.body, ['label'])
    res.send(feature)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
