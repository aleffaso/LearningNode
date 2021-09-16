import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayload { 
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    //Receber o token
    const  authToken = request.headers.authorization
    
    
    //Validar se o token está preenchido

    if(!authToken){
        return response.status(401).end();
    }

    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZWZmYXNvQGdtYWlsLmNvbSIsImlhdCI6MTYzMTU3ODE1MSwiZXhwIjoxNjMxNjY0NTUxLCJzdWIiOiIyODc3ZDM1YS04OWRkLTQ0ZmMtODM4My03ZTY0MTQ2MWYzYTEifQ.5D4iID-zbS0UISOFVHMwT0fvqkbmLWH8-sUGeB5MPfg

    const [,token] = authToken.split(" "); //colocar na segunda posicao o split do array

    //Validar se o token é válido

    try{
        const { sub } = verify(token, "ff243c597063f5ac89183f3eb2239390") as IPayload;
        //Recuperar informações do usuário

        request.user_id = sub;

        return next();
    }catch(err){
        return response.status(401).end();
    }

}