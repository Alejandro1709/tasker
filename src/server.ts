import express from 'express'
import morgan from 'morgan'
import taskRouter from './routes/taskRouter'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/tasks', taskRouter)

export default app
