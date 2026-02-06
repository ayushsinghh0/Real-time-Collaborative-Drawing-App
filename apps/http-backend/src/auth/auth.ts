import { Router } from "express";
import { prisma, Prisma } from "@repo/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { middleware } from "../middlewares/middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateRoomSchema, SigninSchema, CreateUserSchema } from "@repo/common/types";



const router: Router = Router();

router.post("/signUp", async (req, res) => {

    const valid = CreateUserSchema.safeParse(req.body); // Changed to safeParse for consistency
    if (!valid.success) { // Check success field
        res.status(403).json({
            msg: "invalid credential"
        })
        return;
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: valid.data.email }
    })
    if (existingUser) {
        res.status(403).json({
            msg: "User already exists"
        })
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(valid.data.password, 10);

        const user = await prisma.user.create({
            data: {
                name: valid.data.name,
                password: hashedPassword,
                email: valid.data.email
            }
        });

        res.status(201).json({
            userId: user.id
        });
    } catch (e) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})

router.post("/signIn", async (req, res) => {
    const valid = SigninSchema.parse(req.body);
    if (!valid) {
        res.status(404).json({
            msg: "invalid credential"
        })
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: valid.email
        }
    })

    const userId = user?.id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    })
})


router.post("/room", middleware, async (req, res) => {
    const valid = CreateRoomSchema.safeParse(req.body);
    if (!valid) {
        res.status(404).json({
            msg: "invalid credential"
        })
    }

    return;


})

export default router