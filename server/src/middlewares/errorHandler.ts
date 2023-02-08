import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send(err)
  }
  //add custom properties to err object

  // if (err.code && err.code == 11000) {
  //   //   return (err = handleDuplicateKeyError(err, res))
  // }
  res.status(500).send('An unknown error occurred.')
}

export default errorHandler
