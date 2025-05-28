import { NextFunction, Request, Response } from 'express'
import Task from '../models/Task'
import { createTaskSchema } from '../schemas/task.schema'
import catchAsync from '../utils/catchAsync'

export const getTasks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.find()

    res.status(200).json(tasks)
  }
)

export const getTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return next(new Error('This task doesnt exists'))
    }

    res.status(200).json(task)
  }
)

export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = createTaskSchema.parse(req.body)

    const task = await Task.create(body)

    res.status(201).json(task)
  }
)

export const updateTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = createTaskSchema.parse(req.body)

    const task = await Task.findById(req.params.id)

    if (!task) {
      return next(new Error('This task doesnt exists'))
    }

    await task.updateOne(body, {
      runValidators: true,
      new: true,
    })

    res.status(200).json(task)
  }
)

export const deleteTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return next(new Error('This task doesnt exists'))
    }

    await task.deleteOne()

    res.status(204).json({ message: 'Ok' })
  }
)

export const completeTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return next(new Error('This task doesnt exists'))
    }

    const body = {
      completed: true,
      completedAt: Date.now(),
    }

    await task.updateOne(body, {
      runValidators: false,
      new: true,
    })

    res.status(200).json({ message: 'Task completed!' })
  }
)
