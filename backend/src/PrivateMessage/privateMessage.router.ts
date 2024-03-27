import express from "express";
import type { Request, Response } from "express";
import * as PrivateMessageService from "./privateMessage.service";

export const privateMessageRouter = express.Router();

// POST: Create a new private message
privateMessageRouter.post("/", async (req: Request, res: Response) => {
    const { senderId, receiverId, content } = req.body;
    try {
        const message = await PrivateMessageService.createPrivateMessage(senderId, receiverId, content);
        return res.status(201).json(message);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET: Get a private message by ID
privateMessageRouter.get("/:id", async (req: Request, res: Response) => {
    const messageId: string = req.params.id;
    try {
        const message = await PrivateMessageService.getPrivateMessage(messageId);
        if (message) {
            return res.status(200).json(message);
        }
        return res.status(404).json("Private message not found!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET: List all private messages
privateMessageRouter.get("/", async (req: Request, res: Response) => {
    try {
        const messages = await PrivateMessageService.listPrivateMessages();
        return res.status(200).json(messages);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// PUT: Update a private message by ID
privateMessageRouter.put("/:id", async (req: Request, res: Response) => {
    const messageId: string = req.params.id;
    const { content } = req.body;
    try {
        const updatedMessage = await PrivateMessageService.updatePrivateMessage(messageId, content);
        if (updatedMessage) {
            return res.status(200).json(updatedMessage);
        }
        return res.status(404).json("Private message not found!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// DELETE: Delete a private message by ID
privateMessageRouter.delete("/:id", async (req: Request, res: Response) => {
    const messageId: string = req.params.id;
    try {
        await PrivateMessageService.deletePrivateMessage(messageId);
        return res.status(200).json("Private message has been successfully deleted!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});