import { Schema } from 'mongoose'
import {
  CommentModel,
  IComment,
  ICommentMethods,
  voteValues,
} from './comment.model'

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

export default CommentSchema
