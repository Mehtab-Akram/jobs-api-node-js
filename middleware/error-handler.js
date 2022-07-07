const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err)
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || `Some error occured please try again later.`
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)}. Please choose another value.`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  return res.status(customError.statusCode).json({msg : customError.msg})
  //console.log(`Error: ${err}`)
  //return res.status(err.statusCode).json(err)
}

module.exports = errorHandlerMiddleware
