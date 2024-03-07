import { useState,useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface Publication {
  id: number;
  title: string;
  content: string;
  image: string;
  link: string; // Add link property to Publication interface
}

const PublicationCardContainer = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  width: 400,
  margin: '10px',
  height: 200,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
});

const ImageContainer = styled('div')({
  flex: '0 0 auto',
  marginRight: '20px',
  width: '70px', // Adjust the width of the image container
  height: '70px', // Adjust the height of the image container
  borderRadius: '50%', // Add border radius
  overflow: 'hidden', // Hide overflow for rounded corners
});

const ThumbnailImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const PublicationCard: React.FC<{ publication: Publication }> = ({ publication }) => (
  <PublicationCardContainer>
    <ImageContainer>
      <ThumbnailImage src={publication.image} alt="Publication" />
    </ImageContainer>
    <CardContent>
      <Typography variant="h6">
        <a href={publication.link} target="_blank" rel="noopener noreferrer">
          {publication.title}
        </a>
      </Typography>
      <Typography variant="body2">{publication.content}</Typography>
    </CardContent>
  </PublicationCardContainer>
);

const PublicationList: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    // Mocked data for demonstration
    const mockData: Publication[] = [
      { id: 1, title: 'ERITREA: HOW DID WE GET HERE?', content: 't is more than a quarter of a century since the day when I first arrived in Eritrea to begin a new career and a whole new life. Most of my friends and family had to check their atlas to be quite sure where I was going because then, as now, Eritrea is a strangely silent and unknown country.', image: 'https://newint.org/sites/default/files/d7/u368/Panos_00230125%20%281%29.jpg', link: 'publication1.html' },
      { id: 2, title: 'Publication 2', content: 'Content of publication 2', image: 'image2.jpg', link: 'publication2.html' },
      { id: 3, title: 'Publication 3', content: 'Content of publication 3', image: 'image3.jpg', link: 'publication3.html' },
      { id: 4, title: 'Publication 1', content: 'Content of publication 4', image: 'image4.jpg', link: 'publication4.html' },
      { id: 5, title: 'Publication 2', content: 'Content of publication 5', image: 'image5.jpg', link: 'publication5.html' },
      { id: 6, title: 'Publication 3', content: 'Content of publication 6', image: 'image6.jpg', link: 'publication6.html' },
    ];
    setPublications(mockData);
  }, []);

  return (
    <div>
      <Typography style={{marginLeft: '100px', fontSize: '30px', fontFamily:'inherit', fontWeight:'none'}}>Publications</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '60px', marginTop: '20px' }}>
        {publications.map(publication => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
      </div>
    </div>
  );
};

export default PublicationList;
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography } from '@mui/material';

// interface Publication {
//   id: number;
//   title: string;
//   content: string;
// }

// const PublicationCard: React.FC<{ publication: Publication }> = ({ publication }) => (
//   <Card style={{ width: 400, margin: '10px', height:200 }}>
//     <CardContent>
//       <Typography variant="h6">{publication.title}</Typography>
//       <Typography variant="body2">{publication.content}</Typography>
//     </CardContent>
//   </Card>
// );

// const PublicationList: React.FC = () => {
//   const [publications, setPublications] = useState<Publication[]>([]);

//   useEffect(() => {
//     // Mocked data for demonstration
//     const mockData: Publication[] = [
//       { id: 1, title: 'Publication 1', content: 'Content of publication 1' },
//       { id: 2, title: 'Publication 2', content: 'Content of publication 2' },
//       { id: 3, title: 'Publication 3', content: 'Content of publication 3' },
//       { id: 4, title: 'Publication 1', content: 'Content of publication 4' },
//       { id: 5, title: 'Publication 2', content: 'Content of publication 5' },
//       { id: 6, title: 'Publication 3', content: 'Content of publication 6' },
//     ];
//     setPublications(mockData);
//   }, []);

//   return (
//   <div>
//     <Typography>Publications</Typography>
//       <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft:'60px' }}>
//       {publications.map(publication => (
//         <PublicationCard key={publication.id} publication={publication} />
//       ))}
//     </div>
//   </div>
//   );
// };

// export default PublicationList;