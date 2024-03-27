import { ReferralLink } from "@prisma/client";
import { db } from "../utils/db.server";

export const createReferralLink = async (userId: string, url: string): Promise<ReferralLink> => {
    return db.referralLink.create({
        data: {
            user: { connect: { id: userId } },
            url
        }
    });
}

export const getReferralLink = async (linkId: string): Promise<ReferralLink | null> => {
    return db.referralLink.findUnique({
        where: {
            id: linkId
        }
    });
}

export const listReferralLinks = async (): Promise<ReferralLink[]> => {
    return db.referralLink.findMany();
}

export const updateReferralLink = async (linkId: string, url: string): Promise<ReferralLink | null> => {
    return db.referralLink.update({
        where: {
            id: linkId
        },
        data: {
            url
        }
    });
}

export const deleteReferralLink = async (linkId: string): Promise<void> => {
    await db.referralLink.delete({
        where: {
            id: linkId
        }
    });
}