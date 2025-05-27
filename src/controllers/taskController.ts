import { NextFunction, Request, Response } from 'express'

export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Ok' })
}

export const getTask = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Ok' })
}

export const createTask = (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ message: 'Ok' })
}

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Ok' })
}

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Ok' })
}
