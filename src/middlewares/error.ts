import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import * as z from 'zod'
import AppError from '../utils/AppError'

const handleZodError = (res: Response, err: z.ZodError) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }))

  return res.status(400).json({ status: 'fail', message: errors })
}

const handleAppError = (res: Response, err: AppError) => {
  return res
    .status(err.statusCode)
    .json({ status: err.status, message: err.message })
}

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)

  if (err instanceof z.ZodError) {
    handleZodError(res, err)
    return
  }

  if (err instanceof AppError) {
    handleAppError(res, err)
    return
  }

  res.status(500).json({ status: 'error', message: 'Internal Server Error' })
}
