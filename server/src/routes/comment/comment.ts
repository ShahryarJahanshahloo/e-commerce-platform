import express from 'express'
import asyncHandler from 'express-async-handler'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
import * as CommentService from '../../services/comment/comment.service'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const comment = await CommentService.create(req.body)
    res.status(201).send(comment)
  })
)

router.get(
  '/product/:productId',
  asyncHandler(async (req, res) => {
    const comments = await CommentService.findByProductId(req.params.productId)
    res.send(comments)
  })
)

router.patch(
  '/:commentId',
  auth([userRoles.Customer]),
  asyncHandler(async (req, res) => {
    const comment = await CommentService.findAndUpdate(
      req.params.commentId,
      req.body,
      req.user.id
    ).catch(err => res.status(400).send(err))
    res.send(comment)
  })
)

router.put(
  '/:commentId/vote',
  auth(),
  asyncHandler(async (req, res) => {
    const vote = await CommentService.voteById(
      req.params.commentId,
      req.user.id,
      req.body.value
    )
    res.status(201).send(vote)
  })
)

export default router
