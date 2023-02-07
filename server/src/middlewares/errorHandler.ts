import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  try {
    if (err.name === 'ValidationError') {
      //   return (err = handleValidationError(err, res))
    }
    if (err.code && err.code == 11000) {
      //   return (err = handleDuplicateKeyError(err, res))
    }
  } catch (err) {
    res.status(500).send('An unknown error occurred.')
  }
  next()
}

export default errorHandler
