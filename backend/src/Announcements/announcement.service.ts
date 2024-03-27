import { Announcement } from "@prisma/client";
import { db } from "../utils/db.server";

export const createAnnouncement = async (title: string, content: string, image: string, authorId: string): Promise<Announcement> => {
    return db.announcement.create({
        data: {
            title,
            content,
            image,
            author: { connect: { id: authorId } }
        }
    });
}

export const getAnnouncement = async (announcementId: string): Promise<Announcement | null> => {
    return db.announcement.findUnique({
        where: {
            id: announcementId
        }
    });
}

export const listAllAnnouncements = async (): Promise<Announcement[]> => {
    return db.announcement.findMany();
}

export const updateAnnouncement = async (announcementId: string, title: string, content: string, image: string): Promise<Announcement | null> => {
    return db.announcement.update({
        where: {
            id: announcementId
        },
        data: {
            title,
            content,
            image
        }
    });
}

export const deleteAnnouncement = async (announcementId: string): Promise<void> => {
    await db.announcement.delete({
        where: {
            id: announcementId
        }
    });
}