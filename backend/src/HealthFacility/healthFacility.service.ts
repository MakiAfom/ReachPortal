import { db } from "../utils/db.server";

type HealthFacilityRead = {
  id: string; // Use 'string' instead of 'String'
  name: string;
  location: string | null;
  description: string | null;
  contact: string | null;
  image: string | null;
};

type HealthFacilityWrite = {
  name: string;
  location: string;
  description: string;
  contact: string;
  image: string;
};

export const listHealthFacility = async (): Promise<HealthFacilityRead[]> => {
  return db.healthFacility.findMany({
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

export const getHealthFacilitys = async (id: string): Promise<HealthFacilityRead | null> => {
  return db.healthFacility.findUnique({
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

export const createHealthFacility = async (news: HealthFacilityWrite): Promise<HealthFacilityRead> => {
  const { name, location, description,contact, image } = news;

  return db.healthFacility.create({
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

export const updateHealthFacility = async (
  healthFacility: HealthFacilityWrite,
  id: string
): Promise<HealthFacilityRead> => {
  const { name, location, description,contact, image } = healthFacility;
  return db.healthFacility.update({
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

export const deleteHealthFacility = async (id: string): Promise<void> => {
  await db.healthFacility.delete({
    where: {
      id,
    },
  });
};
