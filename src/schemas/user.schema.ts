import * as z from 'zod'

export const createUserSchema = z.object({
  name: z.string({ message: 'Provide your name' }).min(1),
  email: z
    .string({ message: 'Provide your email' })
    .email({ message: 'Provide a valid email' }),
  password: z.string({ message: 'Provide a password' }).min(7),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
