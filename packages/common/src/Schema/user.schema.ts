import {z} from "zod";
export const UserSchema = z.object({
    username:z.string().min(3).max(20),
    password:z.string().min(6),
    email:z.string(),
    name:z.string()

})
export const SigninSchema = z.object({
    username:z.string().min(3).max(20),
    password:z.string().min(6)
})


export const roomSchema = z.object({
    name:z.string().min(3).max(20)
})