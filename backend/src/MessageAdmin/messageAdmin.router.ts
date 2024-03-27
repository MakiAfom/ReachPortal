import express from "express";
import type { Request, Response } from "express";
import * as MessageAdminService from "./messageAdmin.service";

export const messageAdminRouter = express.Router();

// POST: Create a new admin message
messageAdminRouter.post("/", async (req: Request, res: Response) => {
    const { userId, content } = req.body;
    try {
        const message = await MessageAdminService.createMessageAdmin(userId, content);
        return res.status(201).json(message);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// DELETE: Delete an admin message by ID
messageAdminRouter.delete("/:id", async (req: Request, res: Response) => {
    const messageId: string = req.params.id;
    try {
        await MessageAdminService.deleteMessageAdmin(messageId);
        return res.status(200).json("Admin message has been successfully deleted!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});