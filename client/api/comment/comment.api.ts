import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { FormComment } from '../forms'
import { ApiComment } from './entities'

export const CreateComment = (
  comment: FormComment
): RequestReturnType<ApiComment> => {
  return request.post('/comment', { ...comment })
}

export const GetProductComments = (
  productId: string
): RequestReturnType<ApiComment> => {
  return request.get('/comment/product/' + productId)
}

export const UpdateComment = (
  commentId: string,
  updates: {
    text: string
  }
): RequestReturnType<ApiComment> => {
  return request.patch('/comment/' + commentId, { ...updates })
}

export const VoteComment = (
  commentId: string,
  vote: FormComment
): RequestReturnType<{}> => {
  return request.put('/comment/' + commentId + '/vote', { ...vote })
}
