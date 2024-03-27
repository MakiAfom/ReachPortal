import express from "express";
import type { Request, Response } from "express";
import * as CommentService from "./comment.service";

export const commentRouter = express.Router();

// POST: Create a new comment
commentRouter.post("/", async (req: Request, res: Response) => {
    const { content, authorId, postId } = req.body;
    try {
        const newComment = await CommentService.createComment(content, authorId, postId);
        return res.status(201).json(newComment);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// GET: Get a comment by ID
commentRouter.get("/:commentId", async (req: Request, res: Response) => {
    const { commentId } = req.params;
    try {
        const comment = await CommentService.getComment(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        return res.status(200).json(comment);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// GET: List all comments
commentRouter.get("/", async (req: Request, res: Response) => {
    try {
        const comments = await CommentService.listAllComments();
        return res.status(200).json(comments);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT: Update a comment by ID
commentRouter.put("/:commentId", async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { content } = req.body;
    try {
        const updatedComment = await CommentService.updateComment(commentId, content);
        if (!updatedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        return res.status(200).json(updatedComment);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE: Delete a comment by ID
commentRouter.delete("/:commentId", async (req: Request, res: Response) => {
    const { commentId } = req.params;
    try {
        await CommentService.deleteComment(commentId);
        return res.status(204).send();
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});