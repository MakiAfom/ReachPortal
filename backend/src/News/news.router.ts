import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator";


import * as newsService from  "./news.service";


export const newsRouter = express.Router();

//List of JobVacies
newsRouter.get("/", async (req: Request, res: Response) => {
    try{
        const news = await newsService.listNews();
        return res.status(200).json(news);
    } catch(error: any){
        return res.status(500).json(error.message);
    }
});

//GET : A JobVacancy based on the id
newsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string  = req.params.id
    try{
        const news = await newsService.getNews(id);
        if(news){
            return res.status(200).json(news);
        }
    }catch(error: any){
        return res.status(500).json(error.message);
    }
});

//Post method
newsRouter.post(
    "/",
    body("title").isString(),
    body("content").isString(),
    body("author").isString(),
    body("image").isString(),
    async (req:Request, res: Response) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({errors: error.array()});
        }
        try{
            const news = req.body;
            const newNews = await newsService.createNews(news);
            return res.status(200).json(newNews);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
);

//Put: method
newsRouter.put(
    "/:id",
    body("title").isString(),
    body("content").isString(),
    body("author").isString(),
    body("image").isString(),
    async (req:Request, res: Response) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({errors: error.array()});
        }
        const id: string = req.params.id
        try{
            const news = req.body;
            const updateNews = await newsService.updateNews(news, id);
            return res.status(200).json(updateNews);
        } catch(error:any) {
            return res.status(500).json(error.message)
        }
    }
)

//Delete: methnod

newsRouter.delete("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try{
        await newsService.deleteNews(id);
        return res.status(204).json("JobVacancy was succefully deleted!");
    } catch(error: any) {
        return res.status(500).json(error.message)
    }
})