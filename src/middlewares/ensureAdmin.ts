import { Request, Response, NextFunction } from "express";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction){

    const { user_id } = request;

    const usersRepositories = getCustomRepository(UsersRepositories);

    const  user  = await usersRepositories.findOne(user_id);

    if(!user){
        throw new Error ("Unavailable");
    }

    const { admin } = user;

    if(admin){
        return next();
    }
    return response.status(401).json({
        error: "Unauthorized",
    });
}

