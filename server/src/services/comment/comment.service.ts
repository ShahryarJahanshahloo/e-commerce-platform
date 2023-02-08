import Comment from '../../models/comment/comment.model'
import { updateByValidKeys } from '../../utils/common'

export const create = async (body: any) => {
  const comment = new Comment(body)
  await comment.save()
  return comment
}

export const findByProductId = async (productId: any) => {
  const comment = await Comment.find({ product: productId })
  return comment
}

export const findAndUpdate = async (
  commentId: any,
  updates: any,
  userId: any
) => {
  const comment = await Comment.findById(commentId)
  if (comment === null) throw new Error()
  if (comment.customer !== userId) throw new Error()
  await updateByValidKeys(comment, updates, ['text'])
  return comment
}

export const voteById = async (commentId: any, userId: any, voteValue: any) => {
  const comment = await Comment.findById(commentId)
  if (comment === null) throw new Error()
  for (const vote of comment.votes) {
    if (vote.user == userId) {
      vote.value = voteValue
      await comment.save()
      return vote
    }
  }
  const newVote = {
    user: userId,
    value: voteValue,
  }
  comment.votes.push(newVote)
  await comment.save()
  return newVote
}
