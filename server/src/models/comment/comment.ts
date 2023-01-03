import { Schema, model, Model } from 'mongoose'
import Customer from '../user/customer'

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
interface ICommentMethods {}
interface CommentModel extends Model<IComment, {}, ICommentMethods> {}

const CommentSchema = new Schema<IComment, CommentModel, ICommentMethods>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
      maxlength: 511,
      minlength: 3,
    },
    votes: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
          },
          value: {
            type: Number,
            required: true,
            enum: voteValues,
          },
        },
      ],
    },
  },
  {}
)

CommentSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.votes = []
  }

  const customer = await Customer.findById(this.customer)
  if (customer === null) throw new Error('invalid customer')
  next()
})

const Comment = model<IComment, CommentModel>('Comment', CommentSchema)
export default Comment
