import { db } from "../utils/db.server";

type NewsRead = {
  id: string; // Use 'string' instead of 'String'
  title: string; // Use 'string' instead of 'String'
  content: string ;
  author: string ;
  image: string;
};

type NewsWrite = {
    title: string; // Use 'string' instead of 'String'
    content: string ;
    author: string ;
    image: string;
};

export const listNews = async (): Promise<NewsRead[]> => {
  return db.news.findMany({
    select: {
        id: true, 
        title: true, 
        content: true,
        author: true,
        image: true,
    },
  });
};

export const getNews = async (id: string): Promise<NewsRead | null> => {
      return db.news.findUnique({
        where: {
          id,
        },
        select: {
            id: true, 
            title: true, 
            content: true,
            author: true,
            image: true,
        },
      })
}

export const createNews = async (news: NewsWrite): Promise<NewsRead> => {
  const { title, content, author, image } = news;
  
  return db.news.create({
    data: {
      title,
      content,
      author,
      image, // Include the image property here
    },
    select: {
        id: true, 
        title: true, 
        content: true,
        author: true,
        image: true,
    }
  })
}

export const updateNews = async (news: NewsWrite, id: string) : Promise<NewsRead> => {
  const {title, content, author,image} = news;
  return db.news.update({
    where: {
      id,
    }, 
    data: {
      title,
      content,
      author,
      image,
    },
    select: {
      id: true,
      title: true, 
      content: true,
      author: true,
      image: true,
    }
  })
}

export const deleteNews = async (id:string) : Promise<void> => {
  await db.news.delete({
    where: {
      id,
    },
  })
}