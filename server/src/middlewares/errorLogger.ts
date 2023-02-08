import { ErrorRequestHandler } from 'express'

const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  console.error('\x1b[31m', err)
  next(err)
}

export default errorLogger
