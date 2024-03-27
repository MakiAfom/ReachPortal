import express from "express";
import type { Request,Response } from "express";
import {body, validationResult} from "express-validator";

import * as AddtionalInfoService from "./additionalInfo.service";

export const additionalInfoRouter = express.Router();


additionalInfoRouter.get("/", async (req:Request, res:Response) => {
    try{
        const additionalInfo = await AddtionalInfoService.listAdditionalInfo();
        return res.status(200).json(additionalInfo);
    } catch(error: any) {
        return res.status(500).json(error.message)
    }
})

//GET: by id

additionalInfoRouter.get("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id;
    try{
        const additionalInfo = await AddtionalInfoService.getAdditionalInfo(id);
        return res.status(200).json(additionalInfo);
    } catch(error: any) {
        return res.status(500).json(error.message)
    }
})

additionalInfoRouter.post(
    "/",
    body("userInfoId").isString(),
    body("phoneNumber").isString(),
    body("placeOfWork").isString(),
    body("position").isString(),
    body("profession").isString(),
    body("expertise").isString(),
    body("experience").isString(),
    body("portfolioUrl").isString(),
    body("linkedIn").isString(),
    body("availability").isString(),
    body("additionalText").isString(), async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        try{
            const additionalInfo = req.body;
            const newAdditionalInfo = await AddtionalInfoService.createAdditionalInfo(additionalInfo);
            return res.status(201).json(newAdditionalInfo)
        } catch(error: any){
            return res.status(500).json(error.message);
        }
    }
)

additionalInfoRouter.put(
    "/:id",
    body("userInfoId").isString(),
    body("phoneNumber").isString(),
    body("placeOfWork").isString(),
    body("position").isString(),
    body("profession").isString(),
    body("expertise").isString(),
    body("experience").isString(),
    body("portfolioUrl").isString(),
    body("linkedIn").isString(),
    body("availability").isString(),
    body("additionalText").isString(), async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const id: string = req.params.id;
        try{
            const additionalInfo = req.body;
            const newAdditionalInfo = await AddtionalInfoService.updateAdditionalInfo(additionalInfo, id);
            return res.status(201).json(newAdditionalInfo)
        } catch(error: any){
            return res.status(500).json(error.message);
        }
    }
)

additionalInfoRouter.delete("/:id", async (req:Request, res: Response) => {
    const id: string = req.params.id;
    try{
        await AddtionalInfoService.deleteAdditinalInfo(id);
        return res.status(204).json("Additiona Information has been deleted !")
    } catch(error: any) {
        return res.status(500).json(error.message)
    }
})