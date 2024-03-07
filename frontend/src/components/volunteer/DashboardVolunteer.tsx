import React from 'react';
import { Grid, Paper, Button, Avatar, List, ListItem, ListItemText, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150", // URL to user's image
  };

  const connections = [
    { name: 'Jane Smith', email: 'jane.smith@example.com', need: 'Looking for volunteer opportunities', image: 'https://via.placeholder.com/50' },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com', need: 'Seeking advice on career development', image: 'https://via.placeholder.com/50' },
    // Add more connections as needed
  ];

  return (
    <div style={{ padding: '20px', width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Paper style={{ padding: '20px', textAlign: 'center', color: 'black' }}>First Column Content</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: '20px', textAlign: 'center', color: 'black' }}>Second Column Content</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper  style={{ padding: '20px',  color: 'black' }}>
            <Avatar alt={user.name} src={user.image} style={{ marginBottom: '10px' }} />
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>Edit</Button>
          </Paper>
        <Paper  style={{ padding: '20px',  color: 'black', height: '100px', overflowY: 'auto' }}>
            <Typography>Refugees Looking for Talented </Typography>
            <List>
              {connections.map((connection, index) => (
                <ListItem key={index}>
                  <div style={{borderRight: "1px black solid", marginRight:"5px", padding:"2px"}}>
                  <Avatar alt={connection.name} src={connection.image} />
                  <ListItemText primary={connection.name} secondary={connection.email} /> 
                  </div>
             
                 <ListItemText style={{fontSize: "0.4rem"}} primary={connection.need}/>
             
                </ListItem>
              ))}
            </List>
        </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;