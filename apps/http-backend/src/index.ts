import express from "express";
import prisma from "@repo/db";
import  bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common"
import {signupSchema ,signinSchema,roomSchema} from "@repo/common"
const app=express()
app.use(express.json())

app.post("/signUp",async (req,res)=>{

   const validSchema=signupSchema.safeParse(req.body);

   if(!validSchema.success){
    return res.json({
        msg:"invalid Input"
    })
   }

   const {username,password,email,photo}=validSchema.data;
   const hashedPassword = await bcrypt.hash(password, 10);

   const input =await prisma.user.create({
    data:{
        username,
        password : hashedPassword,
        email,
        photo
    }
   })
   if(!input){
    return res.json({
        msg: "something wrong please try again later"
    })
   }



   res.json({
    msg:"user created"
   })
})

app.post("/signin",async (req,res)=>{

    const check=signinSchema.safeParse(req.body);

    if (!check.success) {
  return res.json({ msg: "invalid input" });
}

   const {username,password}=check.data;
  
    
   const User=await prisma.user.findUnique({
    where:{
        username
    }
   })
   if (!User) {
    return res.json({ msg: "user not found" });
  }

   const userPassword=User?.password;
   if(!userPassword){
    return res.json({
        msg:"Enter password"
    })
   }

   const checkPassword=await bcrypt.compare(password,User?.password);

   if(!checkPassword){
    return res.json({
        msg:"incorrectPassword"
    })
   }

   const token=jwt.sign({id:User.id},JWT_SECRET)

   res.json({
    token
   })


})


app.post("/room",isAuth,async (req,res)=>{
    //db call

    const parsedData= roomSchema.safeParse(req.body);

    if(!parsedData.success){
        return res.json({
            msg:"Incorrect input"
        })
    }

    
    //@ts-ignore
    const userId=req.userId;

    await prisma.room.create({
        data:{
            slug:parsedData.data.name,
            adminId:userId
        }
    })

   return  res.json({
        roomId:123  
    })
})

app.listen(3001, () => {
  console.log("Server running");
});