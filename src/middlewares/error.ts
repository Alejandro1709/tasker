import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)

  res.status(500).json({ message: 'Internal Server Error' })
}
