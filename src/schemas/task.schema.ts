import * as z from 'zod'

export const createTaskSchema = z.object({
  content: z.string({ message: 'Provide a content for this task' }).min(1),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
