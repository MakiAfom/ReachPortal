import express from "express";
import type { Request, Response } from "express";
import * as ForumPostService from "./forumPost.service";

export const forumPostRouter = express.Router();

// POST: Create a new forum post
forumPostRouter.post("/", async (req: Request, res: Response) => {
    const { title, content, image, authorId } = req.body;
    try {
        const newForumPost = await ForumPostService.createForumPost(title, content, image, authorId);
        return res.status(201).json(newForumPost);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET: Get a forum post by ID
forumPostRouter.get("/:postId", async (req: Request, res: Response) => {
    const postId: string = req.params.postId;
    try {
        const forumPost = await ForumPostService.getForumPost(postId);
        if (forumPost) {
            return res.status(200).json(forumPost);
        }
        return res.status(404).json("Forum post not found!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET: List all forum posts
forumPostRouter.get("/", async (req: Request, res: Response) => {
    try {
        const forumPosts = await ForumPostService.listForumPosts();
        return res.status(200).json(forumPosts);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// PUT: Update a forum post by ID
forumPostRouter.put("/:postId", async (req: Request, res: Response) => {
    const postId: string = req.params.postId;
    const { title, content, image } = req.body;
    try {
        const updatedForumPost = await ForumPostService.updateForumPost(postId, title, content, image);
        if (updatedForumPost) {
            return res.status(200).json(updatedForumPost);
        }
        return res.status(404).json("Forum post not found!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// DELETE: Delete a forum post by ID
forumPostRouter.delete("/:postId", async (req: Request, res: Response) => {
    const postId: string = req.params.postId;
    try {
        await ForumPostService.deleteForumPost(postId);
        return res.status(200).json("Forum post has been successfully deleted!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});