import { Router } from "express";
import { email, safeParse, string, z } from "zod";
import jwt from "jsonwebtoken";
import { middleware } from "../middlewares/middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateRoomSchema, SigninSchema, CreateUserSchema } from "@repo/common/types"; 
import { prismaClient } from "@repo/db/client";


const router = Router();

router.post("/signUp", async (req, res) => {
    
    const valid=CreateUserSchema.safeParse(req.body);
    if(!valid){
        res.status(404).json({
            msg:"invalid credential"
        })
    }

    const existingser= await prismaClient.User.findOne({
        where:{valid.email}
    })
    prismaClient.User.create({
        data:{
            email:valid.email
        }
    })

    return;





})

router.post("/signIn", async (req, res) => {
    const valid=SigninSchema.safeParse(req.body);
    if(!valid){
        res.status(404).json({
            msg:"invalid credential"
        })
    }

    return;

    const userId = 1;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    })
})


router.post("/room", middleware, async (req, res) => {
   const valid=CreateRoomSchema.safeParse(req.body);
    if(!valid){
        res.status(404).json({
            msg:"invalid credential"
        })
    }

    return;


})