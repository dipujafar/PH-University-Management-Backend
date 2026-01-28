import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if(err.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(status).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ?  err.stack : null,
  });
};

export default globalErrorHandler;
