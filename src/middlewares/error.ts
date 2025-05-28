import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import * as z from 'zod'

const handleZodError = (res: Response, err: z.ZodError) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }))

  return res.status(400).json({ message: errors })
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

  res.status(500).json({ message: 'Internal Server Error' })
}
