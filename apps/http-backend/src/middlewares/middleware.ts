import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";
import { JwtPayload } from "jsonwebtoken";



export function middleware(req:Request,res:Response,next:NextFunction){
      const token=req.headers["authorization"]??""

      const decoded=(jwt.verify(token,JWT_SECRET)) as JwtPayload;

      if(decoded){
        req.user.userId=decoded.userId;
        next();
      }
      else{
        res.status(404).json({
            message:"unauthorized"
        })
      }

}