import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as FeatureService from '../../services/feature/feature.service'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const feature = await FeatureService.create(req.body)
    res.status(201).send(feature)
  })
)

router.get(
  '/:featureId',
  asyncHandler(async (req, res) => {
    const feature = await FeatureService.findById(req.params.featureId)
    res.send(feature)
  })
)

router.patch(
  '/:featureId',
  auth([userRoles.Admin]),
  asyncHandler(async (req, res) => {
    const feature = await FeatureService.findAndUpdate(
      req.params.featureId,
      req.body
    )
    res.send(feature)
  })
)

export default router
