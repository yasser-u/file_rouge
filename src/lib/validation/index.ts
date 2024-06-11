import * as z from "zod"

export const signupParticulier = z.object({
  name: z.string().min(2, { message: 'Trop court'}),
  username: z.string().min(2, { message: 'Trop court'}).max(50, { message: 'Trop long'}),
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(8, {message: 'Le mot de passe doit comporter au moins 8 caractères'})
})

export const signupArtisan = z.object({
  name: z.string().min(2, { message: 'Trop court'}),
  username: z.string().min(2, { message: 'Trop court'}).max(50, { message: 'Trop long'}).optional(),
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(8, {message: 'Le mot de passe doit comporter au moins 8 caractères'}),
  categorie_activite: z.string().min(2, { message: 'Trop court'}),
  adresse: z.string().min(10, { message: 'Trop court'}).max(150, { message: 'Trop long'}).optional(),
  code_postal: z.string().min(5, { message: 'Trop court'}).max(5, { message: 'Trop long'}).optional(),
  ville: z.string().min(2, { message: 'Trop court'}).max(50, { message: 'Trop long'}),
  telephone: z.string().min(10, { message: 'Trop court'}).max(10, { message: 'Trop long'}).optional(),
})

export const signinValidation = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(8, {message: 'Le mot de passe doit comporter au moins 8 caractères'})
})