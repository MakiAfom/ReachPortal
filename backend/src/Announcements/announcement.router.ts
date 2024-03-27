import express from "express";
import type { Request, Response } from "express";
import * as AnnouncementService from "./announcement.service";

export const announcementRouter = express.Router();

// POST: Create a new announcement
announcementRouter.post("/", async (req: Request, res: Response) => {
    const { title, content, image, authorId } = req.body;
    try {
        const newAnnouncement = await AnnouncementService.createAnnouncement(title, content, image, authorId);
        return res.status(201).json(newAnnouncement);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// GET: Get an announcement by ID
announcementRouter.get("/:announcementId", async (req: Request, res: Response) => {
    const { announcementId } = req.params;
    try {
        const announcement = await AnnouncementService.getAnnouncement(announcementId);
        if (!announcement) {
            return res.status(404).json({ error: "Announcement not found" });
        }
        return res.status(200).json(announcement);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// GET: List all announcements
announcementRouter.get("/", async (req: Request, res: Response) => {
    try {
        const announcements = await AnnouncementService.listAllAnnouncements();
        return res.status(200).json(announcements);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// PUT: Update an announcement by ID
announcementRouter.put("/:announcementId", async (req: Request, res: Response) => {
    const { announcementId } = req.params;
    const { title, content, image } = req.body;
    try {
        const updatedAnnouncement = await AnnouncementService.updateAnnouncement(announcementId, title, content, image);
        if (!updatedAnnouncement) {
            return res.status(404).json({ error: "Announcement not found" });
        }
        return res.status(200).json(updatedAnnouncement);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// DELETE: Delete an announcement by ID
announcementRouter.delete("/:announcementId", async (req: Request, res: Response) => {
    const { announcementId } = req.params;
    try {
        await AnnouncementService.deleteAnnouncement(announcementId);
        return res.status(204).send();
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});