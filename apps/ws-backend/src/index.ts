import { WebSocketServer } from "ws";
import {JWT_SECRET} from "@repo/backend-common"

const wss=new WebSocketServer({port:8080});

import jwt, { decode, JwtPayload } from "jsonwebtoken"

wss.on('connection',function connection(ws,request){
    const url=request.url;
    if(!url){
        return;
    }

    const queryParams=new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token');

    if(!token){
        return;
    }

    const decoded=jwt.verify(token,JWT_SECRET)
    if(!decoded || (decoded as JwtPayload))
    ws.on('error',console.error);

    ws.on('message',function message(data){

        console.log("received: %s",data);
        ws.send("pong");
    });

  


});

