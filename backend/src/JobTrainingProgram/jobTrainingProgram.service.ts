import { db } from "../utils/db.server";

type JobTrainingProgramRead = {
  id: string; // Use 'string' instead of 'String'
  title: string;
  location: string | null;
  description: string | null;
  contact: string | null;
  image: string | null;
};

type JobTrainingProgramWrite = {
  title: string;
  location: string;
  description: string;
  contact: string;
  image: string;
};

export const listJobTrainingProgram = async (): Promise<JobTrainingProgramRead[]> => {
  return db.jobTrainingProgram.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      description: true,
      contact: true,
      image: true,
    },
  });
};

export const  getJobTrainingProgram = async (id: string): Promise<JobTrainingProgramRead | null> => {
  return db.jobTrainingProgram.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      location: true,
      description: true,
      contact: true,
      image: true,
    },
  });
};

export const createJobTrainingProgram = async (news: JobTrainingProgramWrite): Promise<JobTrainingProgramRead> => {
  const { title, location, description,contact, image } = news;

  return db.jobTrainingProgram.create({
    data: {
      title,
      location,
      description,
      contact,
      image, // Include the image property here
    },
    select: {
      id: true,
      title: true,
      location: true,
      description: true,
      contact: true,
      image: true,
    },
  });
};

export const updateJobTrainingProgram = async (
  legalAidOrganization: JobTrainingProgramWrite,
  id: string
): Promise<JobTrainingProgramRead> => {
  const { title, location, description,contact, image } = legalAidOrganization;
  return db.jobTrainingProgram.update({
    where: {
      id,
    },
    data: {
        title,
        location,
        description,
        contact,
        image,
    },
    select: {
      id: true,
      title: true,
      location: true,
      description: true,
      contact: true,
      image: true,
    },
  });
};

export const deleteJobTrainingProgram = async (id: string): Promise<void> => {
  await db.jobTrainingProgram.delete({
    where: {
      id,
    },
  });
};