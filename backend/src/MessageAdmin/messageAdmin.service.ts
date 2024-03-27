import { MessageAdmin } from "@prisma/client";
import { db } from "../utils/db.server";

export const createMessageAdmin = async (userId: string, content: string): Promise<MessageAdmin> => {
    return db.messageAdmin.create({
        data: {
            user: { connect: { id: userId } },
            content
        }
    });
}

export const deleteMessageAdmin = async (messageId: string): Promise<void> => {
    await db.messageAdmin.delete({
        where: {
            id: messageId
        }
    });
}