export type ApiComment = {
  _id: string
  product: string
  customer: string
  text: string
  votes: {
    user: string
    value: number
  }[]
}

export type FormComment = {
  product: string
  customer: string
  text: string
}

export type FormCommentVote = {
  value: number
}
