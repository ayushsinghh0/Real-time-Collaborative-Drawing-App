import { Router } from "express";
import { safeParse, string, z } from "zod";
import jwt from "jsonwebtoken";
import { middleware } from "../middlewares/middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { UserSchema } from "@repo/common";


const router = Router();

router.post("/signUp", async (req, res) => {
    const { username, password, email } = req.body();
    UserSchema
    const check = z.object({
        username: string(),
        password: string(),
        email: email
    })

    check.safeParse(req.body);
    //db call






})

router.post("/signIn", async (req, res) => {
    const { username, password, email } = req.body();

    const userId = 1;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    })
})


router.post("/room", middleware, async (req, res) => {
    const { username, password, email } = req.body();


})