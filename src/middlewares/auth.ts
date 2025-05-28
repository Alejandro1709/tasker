import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError'
import User, { IUser } from '../models/User'

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('Not Authorized', 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    if (typeof decoded === 'object' && decoded.id) {
      const user = await User.findById(decoded.id)

      if (!user) {
        return next(new AppError('User not found', 404))
      }

      req.user = user
    }

    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Not Authorized' })
  }
}
