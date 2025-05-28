import mongoose from 'mongoose'
import type { IUser } from './User'

export interface ITask extends mongoose.Document {
  content: string
  completed?: boolean
  completedAt: Date
  user: IUser
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    completedAt: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Task = mongoose.model('Task', taskSchema)

export default Task
