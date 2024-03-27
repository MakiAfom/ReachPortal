import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator";


import * as healthFacilityService from  "./healthFacility.service";


export const healthFacilityRouter = express.Router();

//List of JobVacies
healthFacilityRouter.get("/", async (req: Request, res: Response) => {
    try{
        const healthFacility = await healthFacilityService.listHealthFacility();
        return res.status(200).json(healthFacility);
    } catch(error: any){
        return res.status(500).json(error.message);
    }
});

//GET : A JobVacancy based on the id
healthFacilityRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string  = req.params.id
    try{
        const healthFacility = await healthFacilityService.getHealthFacilitys(id);
        if(healthFacility){
            return res.status(200).json(healthFacility);
        }
    }catch(error: any){
        return res.status(500).json(error.message);
    }
});

//Post method
healthFacilityRouter.post(
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
            const healthFacility = req.body;
            const newHealthFacility = await healthFacilityService.createHealthFacility(healthFacility);
            return res.status(200).json(newHealthFacility);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
);

//Put: method
healthFacilityRouter.put(
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
            const healthFacility = req.body;
            const updateHealthFacility = await healthFacilityService.updateHealthFacility(healthFacility, id);
            return res.status(200).json(updateHealthFacility);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
)

//Delete: methnod

healthFacilityRouter.delete("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try{
        await healthFacilityService.deleteHealthFacility(id);
        return res.status(204).json("JobVacancy was succefully deleted!");
    } catch(error: any) {
        return res.status(500).json(error.message)
    }
})