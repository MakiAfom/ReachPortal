import express from "express";
import type { Request, Response } from "express";
import * as EventRegistrationService from "./eventRegistration.service";

export const eventRegistrationRouter = express.Router();

// GET: List all event registrations
eventRegistrationRouter.get("/", async (req: Request, res: Response) => {
    try {
        const registrations = await EventRegistrationService.listEventRegistrations();
        return res.status(200).json(registrations);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET: Get an event registration by ID
eventRegistrationRouter.get("/:id", async (req: Request, res: Response) => {
    const registrationId: string = req.params.id;
    try {
        const registration = await EventRegistrationService.getEventRegistration(registrationId);
        if (registration) {
            return res.status(200).json(registration);
        }
        return res.status(404).json("Event registration not found!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// POST: Create a new event registration
eventRegistrationRouter.post("/", async (req: Request, res: Response) => {
    const { userId, eventId, status } = req.body;
    try {
        const newRegistration = await EventRegistrationService.createEventRegistration(userId, eventId, status);
        return res.status(201).json(newRegistration);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// PUT: Update an event registration by ID
eventRegistrationRouter.put("/:id", async (req: Request, res: Response) => {
    const registrationId: string = req.params.id;
    const { status } = req.body;
    try {
        const updatedRegistration = await EventRegistrationService.updateEventRegistration(registrationId, status);
        if (updatedRegistration) {
            return res.status(200).json(updatedRegistration);
        }
        return res.status(404).json("Event registration not found!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// DELETE: Delete an event registration by ID
eventRegistrationRouter.delete("/:id", async (req: Request, res: Response) => {
    const registrationId: string = req.params.id;
    try {
        await EventRegistrationService.deleteEventRegistration(registrationId);
        return res.status(200).json("Event registration has been successfully deleted!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});