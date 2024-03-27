import { EventRegistration, RegistrationStatus } from "@prisma/client";
import { db } from "../utils/db.server";

export const createEventRegistration = async (userId: string, eventId: string, status: RegistrationStatus): Promise<EventRegistration> => {
    return db.eventRegistration.create({
        data: {
            user: { connect: { id: userId } },
            event: { connect: { id: eventId } },
            status
        }
    });
}

export const getEventRegistration = async (registrationId: string): Promise<EventRegistration | null> => {
    return db.eventRegistration.findUnique({
        where: {
            id: registrationId
        }
    });
}

export const listEventRegistrations = async (): Promise<EventRegistration[]> => {
    return db.eventRegistration.findMany();
}

export const updateEventRegistration = async (registrationId: string, status: RegistrationStatus): Promise<EventRegistration | null> => {
    return db.eventRegistration.update({
        where: {
            id: registrationId
        },
        data: {
            status
        }
    });
}

export const deleteEventRegistration = async (registrationId: string): Promise<void> => {
    await db.eventRegistration.delete({
        where: {
            id: registrationId
        }
    });
}