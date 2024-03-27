import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator";


import * as jobTrainingProgramService from  "./jobTrainingProgram.service";


export const jobTrainingProgramRouter = express.Router();

//List of JobVacies
jobTrainingProgramRouter.get("/", async (req: Request, res: Response) => {
    try{
        const jobTrainingProgram = await jobTrainingProgramService.listJobTrainingProgram();
        return res.status(200).json(jobTrainingProgram);
    } catch(error: any){
        return res.status(500).json(error.message);
    }
});

//GET : A JobVacancy based on the id
jobTrainingProgramRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string  = req.params.id
    try{
        const jobTrainingProgram = await jobTrainingProgramService.getJobTrainingProgram(id);
        if(jobTrainingProgram){
            return res.status(200).json(jobTrainingProgram);
        }
    }catch(error: any){
        return res.status(500).json(error.message);
    }
});

//Post method
jobTrainingProgramRouter.post(
    "/",
    body("title").isString(),
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
            const jobTrainingProgram = req.body;
            const newjobTrainingProgram = await jobTrainingProgramService.createJobTrainingProgram(jobTrainingProgram);
            return res.status(200).json(newjobTrainingProgram);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
);

//Put: method
jobTrainingProgramRouter.put(
    "/:id",
    body("title").isString(),
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
            const jobTrainingProgram = req.body;
            const updatejobTrainingProgram= await jobTrainingProgramService.updateJobTrainingProgram(jobTrainingProgram, id);
            return res.status(200).json(updatejobTrainingProgram);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
)

//Delete: methnod

jobTrainingProgramRouter.delete("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try{
        await jobTrainingProgramService.deleteJobTrainingProgram(id);
        return res.status(204).json("JobVacancy was succefully deleted!");
    } catch(error: any) {
        return res.status(500).json(error.message)
    }
})