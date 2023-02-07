import express from 'express'
import auth from '../../middlewares/auth'
import { userRoles } from '../../models/user/user.model'
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
    const vote = await CommentService.voteById(
      req.params.commentId,
      req.user.id,
      req.body.value
    )
    res.status(201).send(vote)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
