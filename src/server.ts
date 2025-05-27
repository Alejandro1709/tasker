import express from 'express'
import morgan from 'morgan'
import taskRouter from './routes/taskRouter'
import dotenv from 'dotenv'
import { globalErrorHandler } from './middlewares/error'

dotenv.config()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/tasks', taskRouter)

app.use((req, res, next) => {
  res.status(404).json({ message: 'This route does not exists' })
})

app.use(globalErrorHandler)

export default app
