import express from "express";
import prisma from "@repo/db";
 import  bcrypt from 'bcrypt';

 import jwt from "jsonwebtoken"
import { isAuth } from "./middleware";
import { JWT_SECRET } from "./config";
const app=express()
app.use(express.json())

app.post("/signUp",async (req,res)=>{

   const username=req.body.username;
   
   const password=req.body.password;
    const hashedpassword=await bcrypt.hash(password,10);
  await  prisma.user.create({
    data:{
        username,
        password:hashedpassword
    }
   })

   res.json({
    msg:"user created"
   })
})

app.post("/signin",async (req,res)=>{

   const username=req.body.username;
   
   const password=req.body.password;
    
   const User=await prisma.user.findUnique({
    where:{
        username
    }
   })

   const userPassword=User?.password;
   if(!userPassword){
    return res.json({
        msg:"Enter password"
    })
   }

   const checkPassword=bcrypt.compare(password,User?.password);

   if(!checkPassword){
    return res.json({
        msg:"incorrectPassword"
    })
   }

   if(!User||User.id){
    return res.json({
        msg:"user not found"
    })
   }

   const token=await jwt.sign({id:User.id},JWT_SECRET)

   res.json({
    token
   })


})


app.post("/room",isAuth,(req,res)=>{
    //db call

    res.json({
        roomId:123
    })
})

app.listen(3000);