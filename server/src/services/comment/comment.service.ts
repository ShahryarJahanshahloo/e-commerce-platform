import Comment from '../../models/comment/comment.model'
import { updateByValidKeys } from '../../utils/common'

export const create = async (body: any) => {
  const comment = new Comment(body)
  await comment.save()
}

export const findByProductId = async (productId: any) => {
  return await Comment.find({ product: productId })
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
}
