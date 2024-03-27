import express from "express";
import type { Request, Response } from "express";
import * as ReferralLinkService from "./referralLink.service";

export const referralLinkRouter = express.Router();

// POST: Create a new referral link
referralLinkRouter.post("/", async (req: Request, res: Response) => {
    const { userId, url } = req.body;
    try {
        const link = await ReferralLinkService.createReferralLink(userId, url);
        return res.status(201).json(link);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET: Get a referral link by ID
referralLinkRouter.get("/:id", async (req: Request, res: Response) => {
    const linkId: string = req.params.id;
    try {
        const link = await ReferralLinkService.getReferralLink(linkId);
        if (link) {
            return res.status(200).json(link);
        }
        return res.status(404).json("Referral link not found!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET: List all referral links
referralLinkRouter.get("/", async (req: Request, res: Response) => {
    try {
        const links = await ReferralLinkService.listReferralLinks();
        return res.status(200).json(links);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// PUT: Update a referral link by ID
referralLinkRouter.put("/:id", async (req: Request, res: Response) => {
    const linkId: string = req.params.id;
    const { url } = req.body;
    try {
        const updatedLink = await ReferralLinkService.updateReferralLink(linkId, url);
        if (updatedLink) {
            return res.status(200).json(updatedLink);
        }
        return res.status(404).json("Referral link not found!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// DELETE: Delete a referral link by ID
referralLinkRouter.delete("/:id", async (req: Request, res: Response) => {
    const linkId: string = req.params.id;
    try {
        await ReferralLinkService.deleteReferralLink(linkId);
        return res.status(200).json("Referral link has been successfully deleted!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});