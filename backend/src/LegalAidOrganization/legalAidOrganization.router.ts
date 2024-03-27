import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator";


import * as legalAidOrganizationService from  "./legalAidOrganization.service";


export const legalAidOrganizationRouter = express.Router();

//List of JobVacies
legalAidOrganizationRouter.get("/", async (req: Request, res: Response) => {
    try{
        const legalAidOrganization = await legalAidOrganizationService.listLegalAidOrganization();
        return res.status(200).json(legalAidOrganization);
    } catch(error: any){
        return res.status(500).json(error.message);
    }
});

//GET : A JobVacancy based on the id
legalAidOrganizationRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string  = req.params.id
    try{
        const legalAidOrganization = await legalAidOrganizationService.getLegalAidOrganization(id);
        if(legalAidOrganization){
            return res.status(200).json(legalAidOrganization);
        }
    }catch(error: any){
        return res.status(500).json(error.message);
    }
});

//Post method
legalAidOrganizationRouter.post(
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
            const legalAidOrganization = req.body;
            const newLegalAidOrganization = await legalAidOrganizationService.createLegalAidOrganization(legalAidOrganization);
            return res.status(200).json(newLegalAidOrganization);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
);

//Put: method
legalAidOrganizationRouter.put(
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
            const legalAidOrganization = req.body;
            const updateLegalAidOrganization= await legalAidOrganizationService.updateLegalAidOrganization(legalAidOrganization, id);
            return res.status(200).json(updateLegalAidOrganization);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
)

//Delete: methnod

legalAidOrganizationRouter.delete("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try{
        await legalAidOrganizationService.deleteLegalAidOrganization(id);
        return res.status(204).json("JobVacancy was succefully deleted!");
    } catch(error: any) {
        return res.status(500).json(error.message)
    }
})