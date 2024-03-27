import { db } from "../utils/db.server";
import type { User } from "../User/user.service";

type AdditionalInfoRead = {
  id: string;
  phoneNumber: string;
  placeOfWork: String;
  position: string;
  profession: string;
  expertise: string;
  experience: number;
  portfolioUrl: string | null;
  linkedIn: string | null;
  availability: string;
  additionalText: string;
  userInfo?: User;
};

type AdditionalInfoWrite = {
    phoneNumber: string;
    placeOfWork: string;
    position: string;
    profession: string;
    expertise: string;
    experience: number;
    portfolioUrl: string | null;
    linkedIn: string | null;
    availability: string;
    additionalText: string;
    userInfoId: string;
}

export const listAdditionalInfo = async (): Promise<AdditionalInfoRead[]> => {
    return db.additionalInfo.findMany({
      select: {
        id: true,
        phoneNumber: true,
        placeOfWork: true,
        position: true,
        profession: true,
        expertise: true,
        experience: true,
        portfolioUrl: true,
        linkedIn: true,
        availability: true,
        additionalText: true,
        userInfo: {
          select: {
            id: true,
            name: true, // Assuming you want to include user's name
            email: true, // Assuming you want to include user's email
            role: true,
            image: true,
            password: true,
          },
        },
      },
    });
  };

  export const getAdditionalInfo = async (id: string) : Promise<AdditionalInfoRead | null> => {
    return db.additionalInfo.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            phoneNumber: true,
            placeOfWork: true,
            position: true,
            profession: true,
            expertise: true,
            experience: true,
            portfolioUrl: true,
            linkedIn: true,
            availability: true,
            additionalText: true,
            userInfo: {
              select: {
                id: true,
                name: true, // Assuming you want to include user's name
                email: true, // Assuming you want to include user's email
                role: true,
                image: true,
                password: true,
              },
            },
        },
    })
  }

  export const createAdditionalInfo = async (additionalInfo: AdditionalInfoWrite) : Promise<AdditionalInfoRead> => {
    const {phoneNumber,placeOfWork,position,profession,expertise,experience,portfolioUrl,linkedIn,availability,additionalText,userInfoId} = additionalInfo;
    
    return db.additionalInfo.create({
        data: {
            phoneNumber,
            placeOfWork,
            position,
            profession,
            expertise,
            experience,
            portfolioUrl,
            linkedIn,
            availability,
            additionalText,
            userInfoId,
        },
        select: {
            id: true,
            phoneNumber: true,
            placeOfWork: true,
            position: true,
            profession: true,
            expertise: true,
            experience: true,
            portfolioUrl: true,
            linkedIn: true,
            availability: true,
            additionalText: true,
            userInfo: {
              select: {
                id: true,
                name: true, // Assuming you want to include user's name
                email: true, // Assuming you want to include user's email
                role: true,
                image: true,
                password: true,
              },
            },
        }
    })
  }

  export const updateAdditionalInfo = async (additionalInfo: AdditionalInfoWrite, id: string) : Promise<AdditionalInfoRead> => {
    const {phoneNumber,placeOfWork,position,profession,expertise,experience,portfolioUrl,linkedIn,availability,additionalText,userInfoId} = additionalInfo;
    
    return db.additionalInfo.update({
        where: {
            id,
        },
        data: {
            phoneNumber,
            placeOfWork,
            position,
            profession,
            expertise,
            experience,
            portfolioUrl,
            linkedIn,
            availability,
            additionalText,
            userInfoId,
        },
        select: {
            id: true,
            phoneNumber: true,
            placeOfWork: true,
            position: true,
            profession: true,
            expertise: true,
            experience: true,
            portfolioUrl: true,
            linkedIn: true,
            availability: true,
            additionalText: true,
            userInfo: {
              select: {
                id: true,
                name: true, // Assuming you want to include user's name
                email: true, // Assuming you want to include user's email
                role: true,
                image: true,
                password: true,
              },
            },
        }
    })
  }

  export const deleteAdditinalInfo = async (id:string): Promise<void> => {
    await db.additionalInfo.delete({
        where:{
            id,
        },
        
    })
  }