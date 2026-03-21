import { Request,Response,NextFunction } from "express";
import jwt,  { JwtPayload }  from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common";

interface User{
    id:number;
    username:string;
    password:string;
   
}

export interface AuthenticatedRequest extends Request {
    user?:User
}


export const isAuth= async(req:AuthenticatedRequest,res:Response,next:NextFunction)=>{

     const authHeader = req.headers.authorization;

     if(!authHeader){
        return res.json({
            msg:"Authentication failed please login again"
        })
     }

     const decoded=jwt.verify(authHeader,JWT_SECRET) as  JwtPayload;

     if(decoded){
        req.user=decoded.userId;
     } else {
        res.status(403).json({
            msg:"authorization failed"
        })
     }
}