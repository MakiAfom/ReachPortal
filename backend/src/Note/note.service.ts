import { Note } from "@prisma/client";
import { db } from "../utils/db.server";

export const createNote = async (content: string, image: string, userId: string): Promise<Note> => {
    return db.note.create({
        data: {
            content,
            image,
            user: { connect: { id: userId } }
        }
    });
}

export const getNote = async (noteId: string): Promise<Note | null> => {
    return db.note.findUnique({
        where: {
            id: noteId
        }
    });
}

export const listAllNotes = async (): Promise<Note[]> => {
    return db.note.findMany();
}

export const updateNote = async (noteId: string, content: string, image: string): Promise<Note | null> => {
    return db.note.update({
        where: {
            id: noteId
        },
        data: {
            content,
            image
        }
    });
}

export const deleteNote = async (noteId: string): Promise<void> => {
    await db.note.delete({
        where: {
            id: noteId
        }
    });
}