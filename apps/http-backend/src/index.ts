import "dotenv/config";
console.log("DATABASE_URL:", process.env.DATABASE_URL);
import express from "express";
import authRouter from "./auth/auth"

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

app.listen(3002);