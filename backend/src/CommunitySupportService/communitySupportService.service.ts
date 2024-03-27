import { db } from "../utils/db.server";

type CommunitySupportServiceRead = {
  id: string; // Use 'string' instead of 'String'
  name: string;
  location: string | null;
  description: string | null;
  contact: string | null;
  image: string | null;
};

type CommunitySupportServiceWrite = {
  name: string;
  location: string;
  description: string;
  contact: string;
  image: string;
};

export const listCommunitySupportService  = async (): Promise<CommunitySupportServiceRead[]> => {
  return db.communitySupportService.findMany({
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

export const  getCommunitySupportService = async (id: string): Promise<CommunitySupportServiceRead | null> => {
  return db.communitySupportService.findUnique({
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

export const createCommunitySupportService= async (communitySupportService: CommunitySupportServiceWrite): Promise<CommunitySupportServiceRead> => {
  const { name, location, description,contact, image } = communitySupportService;

  return db.communitySupportService.create({
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

export const updateCommunitySupportService = async (
    communitySupportService: CommunitySupportServiceWrite,
  id: string
): Promise<CommunitySupportServiceRead> => {
  const { name, location, description,contact, image } = communitySupportService;
  return db.communitySupportService.update({
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

export const deleteCommunitySupportService = async (id: string): Promise<void> => {
  await db.communitySupportService.delete({
    where: {
      id,
    },
  });
};