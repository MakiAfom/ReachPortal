import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator";


import * as communitySupportServiceService from  "./communitySupportService.service";


export const communitySupportServiceRouter = express.Router();

//List of JobVacies
communitySupportServiceRouter.get("/", async (req: Request, res: Response) => {
    try{
        const communitySupportService = await communitySupportServiceService.listCommunitySupportService();
        return res.status(200).json(communitySupportService);
    } catch(error: any){
        return res.status(500).json(error.message);
    }
});

//GET : A JobVacancy based on the id
communitySupportServiceRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string  = req.params.id
    try{
        const communitySupportService = await communitySupportServiceService.getCommunitySupportService(id);
        if(communitySupportService){
            return res.status(200).json(communitySupportService);
        }
    }catch(error: any){
        return res.status(500).json(error.message);
    }
});

//Post method
communitySupportServiceRouter.post(
    "/",
    body("name").isString(),
    body("location").isString(),
    body("description").isString(),
    body("contact").isString(),
    body("image").isString(),
    async (req:Request, res: Response) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({errors: error.array()});
        }
        try{
            const communitySupportService = req.body;
            const newcommunitySupportService = await communitySupportServiceService.createCommunitySupportService(communitySupportService);
            return res.status(200).json(newcommunitySupportService);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
);

//Put: method
communitySupportServiceRouter.put(
    "/:id",
    body("name").isString(),
    body("location").isString(),
    body("description").isString(),
    body("contact").isString(),
    body("image").isString(),
    async (req:Request, res: Response) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({errors: error.array()});
        }
        const id: string = req.params.id
        try{
            const communitySupportService = req.body;
            const updatecommunitySupportService= await communitySupportServiceService.updateCommunitySupportService(communitySupportService, id);
            return res.status(200).json(updatecommunitySupportService);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
)

//Delete: methnod

communitySupportServiceRouter.delete("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try{
        await communitySupportServiceService.deleteCommunitySupportService(id);
        return res.status(204).json("JobVacancy was succefully deleted!");
    } catch(error: any) {
        return res.status(500).json(error.message)
    }
})