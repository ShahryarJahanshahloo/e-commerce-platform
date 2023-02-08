import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as FeatureValueService from '../../services/featureValue/featureValue.service'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const featureValue = await FeatureValueService.create(req.body)
    res.status(201).send(featureValue)
  })
)

router.get(
  '/:featureValueId',
  asyncHandler(async (req, res) => {
    const featureValue = await FeatureValueService.findById(
      req.params.featureValueId
    )
    res.send(featureValue)
  })
)

router.patch(
  '/:featureValueId',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const featureValue = await FeatureValueService.findAndUpdate(
      req.params.featureValueId,
      req.body
    )
    res.send(featureValue)
  })
)

export default router
