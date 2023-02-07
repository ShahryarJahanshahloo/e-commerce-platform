import { Schema, model, Model } from 'mongoose'
import Customer from '../user/customer/customer.model'
import CommentSchema from './comment.schema'

export enum voteValues {
  upvote = 1,
  downvote = -1,
}

export interface IComment {
  product: Schema.Types.ObjectId
  customer: Schema.Types.ObjectId
  text: string
  votes: {
    user: Schema.Types.ObjectId
    value: voteValues
  }[]
}
export interface ICommentMethods {}
export interface CommentModel extends Model<IComment, {}, ICommentMethods> {}

CommentSchema.pre('validate', async function (next) {
  if (this.isNew) {
    this.votes = []
  }

  const customer = await Customer.findById(this.customer)
  if (customer === null) throw new Error('invalid customer')
  next()
})

const Comment = model<IComment, CommentModel>('Comment', CommentSchema)
export default Comment
