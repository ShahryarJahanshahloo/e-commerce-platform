import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'
import {
  TypedRequestBody,
  TypedRequestBodyWithParams,
} from '../../TypedRequestBody'
import Comment, { IComment, voteValues } from '../../models/comment/comment'
import { updateByValidKeys } from '../../utils/common'

const router = express.Router()

router.post(
  '/',
  auth([userRoles.Customer]),
  async (req: TypedRequestBody<IComment>, res) => {
    try {
      const comment = new Comment(req.body)
      await comment.save()
      res.status(201).send(comment)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

router.get('/product/:productId', async (req, res) => {
  try {
    const comments = await Comment.find({ product: req.params.productId })
    res.send(comments)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch(
  '/:commentId',
  auth([userRoles.Customer]),
  async (
    req: TypedRequestBodyWithParams<IComment, { commentId: string }>,
    res
  ) => {
    try {
      const comment = await Comment.findById(req.params.commentId)
      if (comment === null) return res.status(400).send()
      if (comment.customer !== req.user.id) return res.status(401).send()
      await updateByValidKeys(comment, req.body, ['text'])
      res.send(comment)
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

router.put(
  '/:commentId/vote',
  auth(),
  async (
    req: TypedRequestBodyWithParams<
      { value: voteValues },
      { commentId: string }
    >,
    res
  ) => {
    try {
      const comment = await Comment.findById(req.params.commentId)
      if (comment === null) return res.status(400).send()
      for (const vote of comment.votes) {
        if (vote.user == req.user.id) {
          vote.value = req.body.value
          await comment.save()
          return res.send()
        }
      }
      comment.votes.push({
        user: req.user.id,
        value: req.body.value,
      })
      await comment.save()
      res.status(201).send()
    } catch (error) {
      res.status(500).send(error)
    }
  }
)

export default router
