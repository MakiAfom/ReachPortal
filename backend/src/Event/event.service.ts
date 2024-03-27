import { Event } from "@prisma/client";
import { db } from "../utils/db.server";

export const createEvent = async (title: string, image: string, organizerId: string, description?: string, location?: string, date?: Date): Promise<Event> => {
    return db.event.create({
        data: {
            title,
            description,
            location,
            image,
            date,
            organizer: { connect: { id: organizerId } }
        }
    });
}

export const getEvent = async (eventId: string): Promise<Event | null> => {
    return db.event.findUnique({
        where: {
            id: eventId
        }
    });
}

export const listEvents = async (): Promise<Event[]> => {
    return db.event.findMany();
}

export const updateEvent = async (eventId: string, title: string, image: string, organizerId: string, description?: string, location?: string, date?: Date): Promise<Event | null> => {
    return db.event.update({
        where: {
            id: eventId
        },
        data: {
            title,
            description,
            location,
            image,
            date,
            organizer: { connect: { id: organizerId } }
        }
    });
}

export const deleteEvent = async (eventId: string): Promise<void> => {
    await db.event.delete({
        where: {
            id: eventId
        }
    });
}