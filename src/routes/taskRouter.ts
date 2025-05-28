import { Router } from 'express'
import {
  completeTask,
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '../controllers/taskController'
import { protect } from '../middlewares/auth'

const router = Router()

router.route('/').get(protect, getTasks).post(protect, createTask)

router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask)

router.put('/:id/complete', protect, completeTask)

export default router
