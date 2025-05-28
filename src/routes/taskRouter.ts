import { Router } from 'express'
import {
  completeTask,
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '../controllers/taskController'

const router = Router()

router.route('/').get(getTasks).post(createTask)

router.route('/:id').get(getTask).put(updateTask).delete(deleteTask)

router.put('/:id/complete', completeTask)

export default router
