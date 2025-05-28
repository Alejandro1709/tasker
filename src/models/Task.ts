import mongoose from 'mongoose'

export interface ITask extends mongoose.Document {
  content: string
  completed?: boolean
  completedAt: Date
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
  },
  {
    timestamps: true,
  }
)

const Task = mongoose.model('Task', taskSchema)

export default Task
