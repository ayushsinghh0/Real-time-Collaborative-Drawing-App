import {z} from "zod"
export const signupSchema=z.object({
    username:z.string().max(30),
    password:z.string().max(30).min(6),
    email:z.email(),
    photo:z.string().optional()
})

export const signinSchema=z.object({
    username:z.string().max(30),
    password:z.string().max(30).min(6)
})

export const roomSchema=z.object({
   
})