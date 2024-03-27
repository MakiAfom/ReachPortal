import { db } from "../utils/db.server";

type JobVacancyRead = {
  id: string; // Use 'string' instead of 'String'
  title: string; // Use 'string' instead of 'String'
  description: string | null;
  location: string | null;
  image: string;
};

type JobVacancyWrite = {
  title: string; // Use 'string' instead of 'String'
  description: string;
  location: string;
  image: string;
};

export const listJobVacancy = async (): Promise<JobVacancyRead[]> => {
  return db.jobVacancy.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      image: true,
    },
  });
};

export const getJobVacancy = async (id: string): Promise<JobVacancyRead | null> => {
      return db.jobVacancy.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          image:true,
        },
      })
}

export const createJobVacancy = async (jobVacancy: JobVacancyWrite): Promise<JobVacancyRead> => {
  const { title, description, location, image } = jobVacancy;
  
  return db.jobVacancy.create({
    data: {
      title,
      description,
      location,
      image, // Include the image property here
    },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      image: true,
    }
  })
}

export const updateJobVacancy = async (jobVacancy: JobVacancyWrite, id: string) : Promise<JobVacancyRead> => {
  const {title,description, location,image} = jobVacancy;
  return db.jobVacancy.update({
    where: {
      id,
    }, 
    data: {
      title,
      description,
      location,
      image,
    },
    select: {
      id: true,
      title:true,
      description:true,
      location:true,
      image:true,
    }
  })
}

export const deleteJobVacancy = async (id:string) : Promise<void> => {
  await db.jobVacancy.delete({
    where: {
      id,
    },
  })
}