const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong'
  };
  if(err.name === 'ValidationError'){
    customError.msg = Object.values(err.errors).map((item) => item.message).join(',');
    customError.statusCode = 400;
  }
  if(err.code === 11000){
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field , pleade choose another value`;
    customError.statusCode = 400;
  }
  return res.status(customError.statusCode).json({ msg : customError.msg })
}

module.exports = errorHandlerMiddleware
