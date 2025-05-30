import express from 'express'
import morgan from 'morgan'
import taskRouter from './routes/taskRouter'
import authRouter from './routes/authRouter'
import dotenv from 'dotenv'
import { globalErrorHandler } from './middlewares/error'
import connectDB from './config/db'
import AppError from './utils/AppError'
import cors from 'cors'

dotenv.config()

const app = express()

connectDB(process.env.MONGO_URI as string)

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/tasks', taskRouter)
app.use('/api/v1/auth', authRouter)

app.use((req, res, next) => {
  return next(new AppError('This route does not exists', 404))
})

app.use(globalErrorHandler)

export default app
