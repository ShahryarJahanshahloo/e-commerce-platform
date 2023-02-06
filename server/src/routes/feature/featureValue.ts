import express from 'express'
import FeatureValue, { IFeatureValue } from '../../models/feature/featureValue'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'
import {
  TypedRequestBody,
  TypedRequestBodyWithParams,
} from '../../TypedRequestBody'
import { updateByValidKeys } from '../../utils/common'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  async (req: TypedRequestBody<IFeatureValue>, res) => {
    try {
      const featureValue = new FeatureValue(req.body)
      await featureValue.save()
      res.status(201).send(featureValue)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

router.get('/:featureValueId', async (req, res) => {
  try {
    const featureValue = await FeatureValue.findById(req.params.featureValueId)
    if (featureValue === null) return res.status(400).send()
    res.send(featureValue)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch(
  '/:featureValueId',
  auth([userRoles.Admin]),
  async (
    req: TypedRequestBodyWithParams<IFeatureValue, { featureValueId: string }>,
    res
  ) => {
    try {
      const featureValue = await FeatureValue.findById(
        req.params.featureValueId
      )
      if (featureValue === null) return res.status(400).send()
      await updateByValidKeys(featureValue, req.body, ['value'])
      res.send(featureValue)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

export default router
