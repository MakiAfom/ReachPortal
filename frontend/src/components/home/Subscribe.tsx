import React from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const Subscribe: React.FC = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '100px', marginBottom: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        News and Updates
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Stay informed with the latest news and updates.
      </Typography>
      <Grid container justifyContent="center" spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Enter your email to subscribe"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button fullWidth variant="contained" color="primary">
            Subscribe
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Subscribe;