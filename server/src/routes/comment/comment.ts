import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user'
import Comment from '../../models/comment/comment'
import * as CommentService from '../../services/comment/comment.service'

const router = express.Router()

router.post('/', auth([userRoles.Customer]), async (req, res) => {
  try {
    const comment = await CommentService.create(req.body)
    res.status(201).send(comment)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/product/:productId', async (req, res) => {
  try {
    const comments = await CommentService.findByProductId(req.params.productId)
    res.send(comments)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/:commentId', auth([userRoles.Customer]), async (req, res) => {
  try {
    const comment = await CommentService.findAndUpdate(
      req.params.commentId,
      req.body,
      req.user.id
    ).catch(err => res.status(400).send(err))
    res.send(comment)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/:commentId/vote', auth(), async (req, res) => {
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
})

export default router
