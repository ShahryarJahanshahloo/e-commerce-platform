import { Express } from 'express'

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export interface TypedRequestBodyWithParams<BodyType, ParamsType>
  extends Express.Request {
  body: BodyType
  params: ParamsType
}

export interface TypedRequest<BT, PT, QT> extends Express.Request {
  body: BT
  params: PT
  query: QT
}
