import { PrivateMessage } from "@prisma/client";
import { db } from "../utils/db.server";

export const createPrivateMessage = async (senderId: string, receiverId: string, content: string): Promise<PrivateMessage> => {
    return db.privateMessage.create({
        data: {
            sender: { connect: { id: senderId } },
            receiver: { connect: { id: receiverId } },
            content
        }
    });
}

export const getPrivateMessage = async (messageId: string): Promise<PrivateMessage | null> => {
    return db.privateMessage.findUnique({
        where: {
            id: messageId
        }
    });
}

export const listPrivateMessages = async (): Promise<PrivateMessage[]> => {
    return db.privateMessage.findMany();
}

export const updatePrivateMessage = async (messageId: string, content: string): Promise<PrivateMessage | null> => {
    return db.privateMessage.update({
        where: {
            id: messageId
        },
        data: {
            content
        }
    });
}

export const deletePrivateMessage = async (messageId: string): Promise<void> => {
    await db.privateMessage.delete({
        where: {
            id: messageId
        }
    });
}