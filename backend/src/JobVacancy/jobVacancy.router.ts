import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator";


import * as jobVacancyService from  "./jobVacancy.service";


export const jobVacancyRouter = express.Router();

//List of JobVacies
jobVacancyRouter.get("/", async (req: Request, res: Response) => {
    try{
        const jobVacancy = await jobVacancyService.listJobVacancy();
        return res.status(200).json(jobVacancy);
    } catch(error: any){
        return res.status(500).json(error.message);
    }
});

//GET : A JobVacancy based on the id
jobVacancyRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string  = req.params.id
    try{
        const jobVacancy = await jobVacancyService.getJobVacancy(id);
        if(jobVacancy){
            return res.status(200).json(jobVacancy);
        }
    }catch(error: any){
        return res.status(500).json(error.message);
    }
});

//Post method
jobVacancyRouter.post(
    "/",
    body("title").isString(),
    body("description").isString(),
    body("location").isString(),
    body("image").isString(),
    async (req:Request, res: Response) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({errors: error.array()});
        }
        try{
            const jobVacancy = req.body;
            const newJobVacancy = await jobVacancyService.createJobVacancy(jobVacancy);
            return res.status(200).json(newJobVacancy);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
);

//Put: method
jobVacancyRouter.put(
    "/:id",
    body("title").isString(),
    body("description").isString(),
    body("location").isString(),
    body("image").isString(),
    async (req:Request, res: Response) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({errors: error.array()});
        }
        const id: string = req.params.id
        try{
            const jobVacancy = req.body;
            const updateJobVacancy = await jobVacancyService.updateJobVacancy(jobVacancy, id);
            return res.status(200).json(updateJobVacancy);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
)

//Delete: methnod

jobVacancyRouter.delete("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try{
        await jobVacancyService.deleteJobVacancy(id);
        return res.status(204).json("JobVacancy was succefully deleted!");
    } catch(error: any) {
        return res.status(500).json(error.message)
    }
})

