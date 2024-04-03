import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardActions,
  Snackbar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  // Send as SendIcon,
  Reply as ReplyIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

interface Message {
  id: number;
  sender: string;
  message: string;
  parentId?: number;
  likes: number;
  dislikes: number;
  replies?: Message[]; // Array to store reply messages
}

const CommunityForm: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "John",
      message: "Hello everyone! How's your day going?",
      likes: 0,
      dislikes: 0,
      replies: [],
    },
    {
      id: 2,
      sender: "Alice",
      message: "I'm excited to join this community forum!",
      likes: 0,
      dislikes: 0,
      replies: [],
    },
    {
      id: 3,
      sender: "Bob",
      message: "Does anyone have recommendations for a good book to read?",
      likes: 0,
      dislikes: 0,
      replies: [],
    },
  ]);
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [replyToId, setReplyToId] = useState<number | undefined>(undefined);
  const [openReplyDialog, setOpenReplyDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [newForumMessage, setNewForumMessage] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [openListItemDialog, setOpenListItemDialog] = useState<boolean>(false);
  const [selectedListItem, setSelectedListItem] = useState<string>("");

  const handleReply = (id: number) => {
    setReplyToId(id);
    setOpenReplyDialog(true);
  };

  const handleCloseReplyDialog = () => {
    setOpenReplyDialog(false);
    setError("");
    setReplyToId(undefined);
  };

  const handleSendReply = () => {
    if (replyMessage.trim() === "") {
      setError("Reply message cannot be empty.");
      return;
    }
    const replyIndex = messages.findIndex(
      (message) => message.id === replyToId
    );
    if (replyIndex !== -1) {
      const updatedMessages = [...messages];
      const replyMessageIndex =
        updatedMessages[replyIndex]?.replies?.length || 0; // Ensure replyMessageIndex is defined
      updatedMessages[replyIndex] = {
        ...updatedMessages[replyIndex],
        replies: [
          ...(updatedMessages[replyIndex]?.replies || []), // Ensure replies array is defined
          {
            id: replyMessageIndex + 1,
            sender: "User",
            message: replyMessage,
            likes: 0,
            dislikes: 0,
          },
        ],
      };
      setMessages(updatedMessages);
    }
    setReplyMessage("");
    setOpenReplyDialog(false);
    setReplyToId(undefined);
    setError("");
    setSnackbarOpen(true);
  };

  const handleSendForumMessage = () => {
    if (newForumMessage.trim() === "") {
      setError("Forum message cannot be empty.");
      return;
    }
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "User",
      message: newForumMessage,
      likes: 0,
      dislikes: 0,
      replies: [], // Initialize replies array for new message
    };
    setMessages([...messages, newMessage]);
    setNewForumMessage("");
    setError("");
    setSnackbarOpen(true);
  };

  const handleLike = (id: number) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === id) {
        return { ...message, likes: message.likes + 1 };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  const handleDislike = (id: number) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === id) {
        return { ...message, dislikes: message.dislikes + 1 };
      }
      return message;
    });
    setMessages(updatedMessages);
  };
  const handleListItemClick = (item: string) => {
    setSelectedListItem(item);
    setOpenListItemDialog(true);
  };

  const handleCloseListItemDialog = () => {
    setOpenListItemDialog(false);
    setSelectedListItem("");
  };

  return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "90%",
          marginLeft: "50px",
        }}
      >
        <Navbar />
        <div style={{ marginBottom: "20px" }}>
          <Card style={{backgroundColor: '#f5f5f5' , boxShadow: 'none', width: '100%'}}>
           
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
                <Typography> Community & Comunicate !</Typography>
              <div style={{ marginBottom: "20px", width: "100%" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search contents..."
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div style={{ margin: "0 10px" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Members: 1000
                  </Typography>
                </div>
                <div style={{ margin: "0 10px" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Online Users: 50
                  </Typography>
                </div>
                <div style={{ margin: "0 10px" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Posts: 5000
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div style={{ display: "flex" }}>
          <Card sx={{ width: "90%", height: 600, overflowY: "scroll", boxShadow: 'none' }}>
            <CardContent>
              <TextField
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                placeholder="Start a new forum..."
                value={newForumMessage}
                onChange={(e) => setNewForumMessage(e.target.value)}
                error={error !== ""}
                helperText={error}
                InputProps={{ style: { marginBottom: "10px" } }}
              />
              <Button
                onClick={handleSendForumMessage}
                variant="contained"
                color="primary"
                style={{ marginLeft: '50px', marginBottom: '20px' }}
              >
                Send
              </Button>
              <IconButton
                aria-label="notifications"
                onClick={() => setSnackbarOpen(true)}
                style={{marginLeft: '80%'}}
              >
                <NotificationsIcon />
              </IconButton>
              {messages.map((message) => (
                <div key={message.id}>
                  <Card sx={{ marginBottom: 2 }}>
                    <CardHeader
                      avatar={<Avatar>{message.sender.charAt(0)}</Avatar>}
                      title={message.sender}
                      subheader={`Likes: ${message.likes} | Dislikes: ${message.dislikes}`}
                    />
                    <CardContent>
                      <Typography>{message.message}</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <IconButton onClick={() => handleReply(message.id)}>
                        <ReplyIcon />
                      </IconButton>
                      <IconButton onClick={() => handleLike(message.id)}>
                        <ThumbUpIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDislike(message.id)}>
                        <ThumbDownIcon />
                      </IconButton>
                    </CardActions>
                    {message.replies &&
                      message.replies.map((reply) => (
                        <Card
                          key={reply.id}
                          sx={{ marginLeft: "16px", marginBottom: "8px" }}
                        >
                          <CardContent>
                            <Typography variant="subtitle2">
                              {reply.sender}
                            </Typography>
                            <Typography>{reply.message}</Typography>
                          </CardContent>
                        </Card>
                      ))}
                  </Card>
                </div>
              ))}
            </CardContent>

            <Dialog open={openReplyDialog} onClose={handleCloseReplyDialog}>
              <DialogTitle>Reply to Message</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  error={error !== ""}
                  helperText={error}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseReplyDialog}>Cancel</Button>
                <Button onClick={handleSendReply}>Send</Button>
              </DialogActions>
            </Dialog>
          </Card>
          <Card sx={{ width: "25%", marginRight: "20px"}} >
            <CardContent>
              <List>
                <ListItem button onClick={() => handleListItemClick("Item 1")}>
                  <ListItemText primary="Item 1" />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick("Item 2")}>
                  <ListItemText primary="Item 2" />
                </ListItem>
                <ListItem button onClick={() => handleListItemClick("Item 3")}>
                  <ListItemText primary="Item 3" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Dialog open={openListItemDialog} onClose={handleCloseListItemDialog}>
            <DialogTitle>{selectedListItem}</DialogTitle>
            <DialogContent>
              <Typography>
                This is the content of {selectedListItem}.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseListItemDialog}>Close</Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message="Message sent successfully"
          />
        </div>
        <Footer />
      </div>
  );
};

export default CommunityForm;
// import React, { useState } from 'react';
// import { Avatar, Button, Card, CardContent, CardHeader, Divider, IconButton, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, CardActions, Snackbar } from '@mui/material';
// import { Send as SendIcon, Reply as ReplyIcon, ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon, Notifications as NotificationsIcon } from '@mui/icons-material';

// interface Message {
//   id: number;
//   sender: string;
//   message: string;
//   parentId?: number;
//   likes: number;
//   dislikes: number;
// }

// const CommunityForm: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     { id: 1, sender: "John", message: "Hello everyone! How's your day going?", likes: 0, dislikes: 0 },
//     { id: 2, sender: "Alice", message: "I'm excited to join this community forum!", likes: 0, dislikes: 0 },
//     { id: 3, sender: "Bob", message: "Does anyone have recommendations for a good book to read?", likes: 0, dislikes: 0 },
//   ]);
//   const [replyMessage, setReplyMessage] = useState<string>('');
//   const [replyToId, setReplyToId] = useState<number | undefined>(undefined);
//   const [openReplyDialog, setOpenReplyDialog] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [newForumMessage, setNewForumMessage] = useState<string>('');
//   const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

//   const handleReply = (id: number) => {
//     setReplyToId(id);
//     setOpenReplyDialog(true);
//   };

//   const handleCloseReplyDialog = () => {
//     setOpenReplyDialog(false);
//     setError('');
//     setReplyToId(undefined);
//   };

//   const handleSendReply = () => {
//     if (replyMessage.trim() === '') {
//       setError('Reply message cannot be empty.');
//       return;
//     }
//     const newMessage: Message = {
//       id: messages.length + 1,
//       sender: "User",
//       message: replyMessage,
//       parentId: replyToId,
//       likes: 0,
//       dislikes: 0,
//     };
//     setMessages([...messages, newMessage]);
//     setReplyMessage('');
//     setOpenReplyDialog(false);
//     setReplyToId(undefined);
//     setError('');
//     setSnackbarOpen(true);
//   };

//   const handleSendForumMessage = () => {
//     if (newForumMessage.trim() === '') {
//       setError('Forum message cannot be empty.');
//       return;
//     }
//     const newMessage: Message = {
//       id: messages.length + 1,
//       sender: "User",
//       message: newForumMessage,
//       likes: 0,
//       dislikes: 0,
//     };
//     setMessages([...messages, newMessage]);
//     setNewForumMessage('');
//     setError('');
//     setSnackbarOpen(true);
//   };

//   const handleLike = (id: number) => {
//     const updatedMessages = messages.map(message => {
//       if (message.id === id) {
//         return { ...message, likes: message.likes + 1 };
//       }
//       return message;
//     });
//     setMessages(updatedMessages);
//   };

//   const handleDislike = (id: number) => {
//     const updatedMessages = messages.map(message => {
//       if (message.id === id) {
//         return { ...message, dislikes: message.dislikes + 1 };
//       }
//       return message;
//     });
//     setMessages(updatedMessages);
//   };

//   return (
//     <>
// <Card sx={{ width: '90%', height: 600, overflowY: 'scroll', marginLeft: '50px', }}>
//       <TextField
//           multiline
//           rows={4}
//           variant="outlined"
//           fullWidth
//           placeholder="Start a new forum..."
//           value={newForumMessage}
//           onChange={(e) => setNewForumMessage(e.target.value)}
//           error={error !== ''}
//           helperText={error}
//         />
//         <Button onClick={handleSendForumMessage} variant="contained" color="primary" style={{ marginTop: '10px', marginBottom: '10px' }}>Send</Button>
//         <IconButton aria-label="notifications" onClick={() => setSnackbarOpen(true)}>
//           <NotificationsIcon />
//         </IconButton>
//         <CardContent>
//           {messages.map((message) => (
//             <div key={message.id}>
//               <Card sx={{ marginBottom: 2, width: '100%' }}>
//                 <CardHeader
//                   avatar={<Avatar>{message.sender.charAt(0)}</Avatar>}
//                   title={message.sender}
//                   subheader={`Likes: ${message.likes} | Dislikes: ${message.dislikes}`}
//                 />
//                 <CardContent>
//                   <Typography>{message.message}</Typography>
//                 </CardContent>
//                 <Divider />
//                 <CardActions>
//                   <IconButton onClick={() => handleReply(message.id)}><ReplyIcon /></IconButton>
//                   <IconButton onClick={() => handleLike(message.id)}><ThumbUpIcon /></IconButton>
//                   <IconButton onClick={() => handleDislike(message.id)}><ThumbDownIcon /></IconButton>
//                 </CardActions>
//                 {message.parentId && <Typography variant="body2" style={{ marginLeft: '16px' }}>Replying to: {messages.find(msg => msg.id === message.parentId)?.sender}</Typography>}
//               </Card>
//             </div>
//           ))}
//         </CardContent>
//         <Dialog open={openReplyDialog} onClose={handleCloseReplyDialog}>
//       <DialogTitle>Reply to Message</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           multiline
//           rows={4}
//           variant="outlined"
//           fullWidth
//           value={replyMessage}
//           onChange={(e) => setReplyMessage(e.target.value)}
//           error={error !== ''}
//           helperText={error}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCloseReplyDialog}>Cancel</Button>
//         <Button onClick={handleSendReply}>Send</Button>
//       </DialogActions>
//     </Dialog>
//   </Card>
//   <Snackbar
//     open={snackbarOpen}
//     autoHideDuration={6000}
//     onClose={() => setSnackbarOpen(false)}
//     message="Message sent successfully"
//   />
// </>
//   );
// };
// export default CommunityForm;
