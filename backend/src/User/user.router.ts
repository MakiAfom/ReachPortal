import express from "express";
import type { Request,Response } from "express";
import {body, validationResult} from "express-validator";

import * as UserService from  "./user.service";

export const userRouter = express.Router();


//GET: List all 
userRouter.get("/", async (req: Request, res: Response) => {
    try{
        const user = await UserService.listUser();
        return res.status(200).json(user);
    } catch(error: any) {
        return res.status(500).json(error.message);
    }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try{
        const user = await UserService.getUser(id);
        if(user){
            return res.status(200).json(user);
        }
        return res.status(400).json("User Could not be found!");
        
    } catch(error: any) {
        return res.status(500).json(error.message);
    }
});

userRouter.post(
    "/",
    body("name").isString(),
    body("email").isString(),
    body("password").isString(),
    body("image").isString(),
    body("role").isString(), async (req:Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        try{
            const user = req.body;
            const newUser = await UserService.createUser(user);
            return res.status(201).json(newUser);
        } catch(error: any) {
            return res.status(500).json(error.message);
        }
    }
)

userRouter.put(
    "/:id",
    body("name").isString(),
    body("email").isString(),
    body("password").isString(),
    body("image").isString(),
    body("role").isString(), async (req:Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const id: string = req.params.id
        try{
            const user = req.body;
            const newUser = await UserService.updateUser(user, id);
            return res.status(201).json(newUser);
        } catch(error: any) {
            return res.status(500).json(error.message);
        }
    }
)

userRouter.delete("/:id", async (req:Request, res: Response) => {
        const id: string = req.params.id
        try{
           await UserService.deleteUser(id);
            return res.status(201).json("User has been successfuly deleted!");
        } catch(error: any) {
            return res.status(500).json(error.message);
        }
    }
)