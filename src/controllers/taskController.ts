import { NextFunction, Request, Response } from 'express'
import Task from '../models/Task'
import { createTaskSchema } from '../schemas/task.schema'
import catchAsync from '../utils/catchAsync'
import User from '../models/User'
import AppError from '../utils/AppError'

export const getTasks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.find({ user: req.user?.id })

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

    const user = await User.findById(req.user?.id)

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    const task = await Task.create({ ...body, user: user.id })

    user.tasks.push(task)

    await user.save()

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

    const user = await User.findById(req.user?.id)

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    const taskIndex = user.tasks.indexOf(task.id)

    user.tasks.splice(taskIndex, 1)

    await user.save()

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
