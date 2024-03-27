import { db } from "../utils/db.server";

type LegalAidOrdanizationRead = {
  id: string; // Use 'string' instead of 'String'
  name: string;
  location: string | null;
  description: string | null;
  contact: string | null;
  image: string | null;
};

type LegalAidOrdanizationWrite = {
  name: string;
  location: string;
  description: string;
  contact: string;
  image: string;
};

export const listLegalAidOrganization = async (): Promise<LegalAidOrdanizationRead[]> => {
  return db.legalAidOrganization.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      description: true,
      contact: true,
      image: true,
    },
  });
};

export const  getLegalAidOrganization = async (id: string): Promise<LegalAidOrdanizationRead | null> => {
  return db.legalAidOrganization.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      location: true,
      description: true,
      contact: true,
      image: true,
    },
  });
};

export const createLegalAidOrganization = async (news: LegalAidOrdanizationWrite): Promise<LegalAidOrdanizationRead> => {
  const { name, location, description,contact, image } = news;

  return db.legalAidOrganization.create({
    data: {
      name,
      location,
      description,
      contact,
      image, // Include the image property here
    },
    select: {
      id: true,
      name: true,
      location: true,
      description: true,
      contact: true,
      image: true,
    },
  });
};

export const updateLegalAidOrganization = async (
  legalAidOrganization: LegalAidOrdanizationWrite,
  id: string
): Promise<LegalAidOrdanizationRead> => {
  const { name, location, description,contact, image } = legalAidOrganization;
  return db.legalAidOrganization.update({
    where: {
      id,
    },
    data: {
        name,
        location,
        description,
        contact,
        image,
    },
    select: {
      id: true,
      name: true,
      location: true,
      description: true,
      contact: true,
      image: true,
    },
  });
};

export const deleteLegalAidOrganization = async (id: string): Promise<void> => {
  await db.legalAidOrganization.delete({
    where: {
      id,
    },
  });
};