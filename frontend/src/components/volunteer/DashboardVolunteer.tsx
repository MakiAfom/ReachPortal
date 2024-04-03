import React, { useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,
  DialogTitle,
  DialogActions,
  Dialog,
  DialogContent,
} from "@mui/material";
import userimage from "../../assets/student.jpeg";
import AdditionalInfoForm from "./AdditionalInfoForm";

const Dashboard: React.FC = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150", // URL to user's image
  };

  const [openComposeDialog, setOpenComposeDialog] = useState<boolean>(false);

  const [list1Contents, setList1Contents] = useState<string[]>([
    "Item 1A",
    "Item 1B",
    "Item 1C",
  ]);
  const [list2Contents, setList2Contents] = useState<string[]>([
    "Item 2A",
    "Item 2B",
    "Item 2C",
  ]);
  const [newsContents, setNewsContents] = useState<string[]>([
    "News 1",
    "News 2",
    "News 3",
  ]);

  const [selectedListContents, setSelectedListContents] = useState<string[]>(
    []
  );
  const [selectedContentIndex, setSelectedContentIndex] = useState<
    number | null
  >(null);
  const [newContent, setNewContent] = useState<string>("");

  const [openAdditionalInfoDialog, setOpenAdditionalInfoDialog] = useState<boolean>(false)

  const paperStyles= {
    padding: "20px",
    color: "black",
  }

  const cardStyles = {
    padding: "20px",
    color: "black",
  }

  const handleListClick = (listContents: string[]) => {
    setSelectedListContents(listContents);
    setSelectedContentIndex(null); // Reset selected content index
  };
  const connections = [
    { name: 'Jane Smith', email: 'jane.smith@example.com', need: 'Looking for volunteer opportunities', image: 'https://via.placeholder.com/50' },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com', need: 'Seeking advice on career development', image: 'https://via.placeholder.com/50' },
    // Add more connections as needed
  ];

  const handleEditClick = (index: number) => {
    // Handle edit action
    setSelectedContentIndex(index);
  };

  const handleDeleteClick = (index: number) => {
    // Handle delete action
    const updatedContents = selectedListContents.filter((_, i) => i !== index);
    setSelectedListContents(updatedContents);
    setSelectedContentIndex(null); // Reset selected content index
  };

  const handleAddContent = () => {
    if (newContent.trim() !== "") {
      const updatedContents = [...selectedListContents, newContent];
      setSelectedListContents(updatedContents);
      setNewContent("");
    }
  };

  const handleAdditionalSubmit = () => {
    //handle submission of additional information form 
    console.log("Additional info submitted:");
    // setOpenAdditionalInfoDialog(false)
  }

  return (
    <div style={{ padding: "5px", width: "100%" , margin: "20px"}}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Paper
            style={{
              ...paperStyles,
              textAlign: "center",
              color: "black",
              minHeight: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Lists</Typography>
            <div>
              <List>
                <ListItem button onClick={() => handleListClick(list1Contents)}>
                  <ListItemText primary="List 1" />
                </ListItem>
                <ListItem button onClick={() => handleListClick(list2Contents)}>
                  <ListItemText primary="List 2" />
                </ListItem>
                <ListItem button onClick={() => handleListClick(newsContents)}>
                  <ListItemText primary="News" />
                </ListItem>
              </List>
            </div>
            <div>
              <TextField
                label="New Content"
                variant="outlined"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                style={{ marginBottom: "5px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddContent}
              >
                Add New
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            style={{
              ...paperStyles,
              textAlign: "center",
              color: "black",
              height: "600px",
              overflowY: "auto",
            }}
          >
            {selectedListContents.map((content, index) => (
              <Card
                key={index}
                style={{
                  marginBottom: "10px",
                  boxShadow: "0px 3px 6px #00000029",
                }}
              >
                <CardContent>
                  <Typography variant="body1">{content}</Typography>
                </CardContent>
                {selectedListContents !== newsContents && (
                  <CardActions>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteClick(index)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                )}
              </Card>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{   ...paperStyles,padding: "20px"}}>
            <Avatar
              alt={user.name}
              src={userimage}
              style={{ marginBottom: "10px" }}
            />
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Edit
            </Button>
            <Button variant="contained" color="primary" style={{marginTop: "10px"}} onClick={() => setOpenAdditionalInfoDialog(true)}>Add More Information</Button>
          </Paper>
          <Paper
            style={{
              padding: "20px",
              color: "black",
              height: "100px",
              overflowY: "auto",
            }}
           >
            <Typography>Refugees Looking for Talented </Typography>
            <List>
              {connections.map((connection, index) => (
                <ListItem key={index}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Avatar
                        alt={connection.name}
                        src={connection.image}
                        style={{ marginRight: "10px" }}
                      />
                    </Grid>
                    <Grid item xs>
                      <ListItemText
                        primary={connection.name}
                        secondary={connection.email}
                        primaryTypographyProps={{ variant: "body2" }}
                        secondaryTypographyProps={{ variant: "body2" }}
                        style={{ marginLeft: "5px" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2">{connection.need}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper style={{ padding: "20px", marginTop: "20px", color: "black" }}>
            <Typography variant="h6" gutterBottom>
              Messages
            </Typography>
            <Card
              style={{
                marginBottom: "10px",
                boxShadow: "0px 3px 6px #00000029",
              }}
            >
              <CardContent>
                <Avatar
                  alt="Sender"
                  src="https://via.placeholder.com/150"
                  style={{ marginRight: "10px" }}
                />
                <Typography variant="subtitle1">Sender Name</Typography>
                <Typography variant="body1">
                  Message content goes here...
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="primary">
                  Reply
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpenComposeDialog(true)}
                >
                  Compose
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
        <Dialog
          open={openComposeDialog}
          onClose={() => setOpenComposeDialog(false)}
        >
          <DialogTitle>Compose Message</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Recipient"
              type="text"
              fullWidth
            />
            <TextField margin="dense" label="Message" type="text" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenComposeDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => setOpenComposeDialog(false)} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <AdditionalInfoForm open={openAdditionalInfoDialog}
      onClose={() => setOpenAdditionalInfoDialog(false)}
      onSubmit={handleAdditionalSubmit} />
    </div>
  );
};

export default Dashboard;
