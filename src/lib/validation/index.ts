import * as z from "zod"


export const signupValidation = z.object({
  name: z.string().min(2, { message: 'Too short'}),
  username: z.string().min(2, { message: 'Too short'}).max(50, { message: 'Too long'}),
  email: z.string().email(),
  password: z.string().min(8, {message: 'mdp must be at least 8 characters'})
})

export const signinValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: 'mdp must be at least 8 characters'})
})

export const postValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
})