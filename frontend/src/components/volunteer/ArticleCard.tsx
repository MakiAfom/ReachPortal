// ArticleCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Article } from './types';

interface Props {
  article: Article;
  onDelete: (id: number) => void;
}

const ArticleCard: React.FC<Props> = ({ article, onDelete }) => {
  const handleDelete = () => {
    onDelete(article.id);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {article.content}
        </Typography>
        <Button variant="outlined" color="error" onClick={handleDelete} style={{ marginTop: '10px' }}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}

export default ArticleCard;