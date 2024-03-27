import express from "express";
import type { Request, Response } from "express";
import * as EventService from "./event.service";

export const eventRouter = express.Router();

// GET: List all events
eventRouter.get("/", async (req: Request, res: Response) => {
    try {
        const events = await EventService.listEvents();
        return res.status(200).json(events);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET: Get an event by ID
eventRouter.get("/:id", async (req: Request, res: Response) => {
    const eventId: string = req.params.id;
    try {
        const event = await EventService.getEvent(eventId);
        if (event) {
            return res.status(200).json(event);
        }
        return res.status(404).json("Event not found!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// POST: Create a new event
eventRouter.post("/", async (req: Request, res: Response) => {
    const { title, description, location, image, date, organizerId } = req.body;
    try {
        const newEvent = await EventService.createEvent(title, description, location, image, date, organizerId);
        return res.status(201).json(newEvent);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// PUT: Update an event by ID
eventRouter.put("/:id", async (req: Request, res: Response) => {
    const eventId: string = req.params.id;
    const { title, description, location, image, date } = req.body;
    try {
        const updatedEvent = await EventService.updateEvent(eventId, title, description, location, image, date);
        if (updatedEvent) {
            return res.status(200).json(updatedEvent);
        }
        return res.status(404).json("Event not found!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// DELETE: Delete an event by ID
eventRouter.delete("/:id", async (req: Request, res: Response) => {
    const eventId: string = req.params.id;
    try {
        await EventService.deleteEvent(eventId);
        return res.status(200).json("Event has been successfully deleted!");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});