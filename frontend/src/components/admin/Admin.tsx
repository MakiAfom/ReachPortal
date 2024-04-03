import React, { useState, useEffect } from "react";
import {
  Drawer,
  Typography,
  List,
  Container,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { MyAppBar, MyLogo, MyToolbar } from "../../utils/StyledComps";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import reach from "../../assets/reach.svg"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const drawerWidth = 240;

interface UserData {
  month: string;
  count: number;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [skilledUserData, setSkilledUserData] = useState<UserData[]>([]);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<string>(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."
  );
  const [openReplyDialog, setOpenReplyDialog] = useState<boolean>(false);
  const [showCharts, setShowCharts] = useState<boolean>(true);
  const [resourceContent, setResourceContent] = useState<any[]>([]);

  const [composeOpen, setComposeOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Sample data for demonstration
    const sampleUserData: UserData[] = [
      { month: "Jan", count: 100 },
      { month: "Feb", count: 150 },
      { month: "Mar", count: 200 },
    ];

    const sampleSkilledUserData: UserData[] = [
      { month: "Jan", count: 50 },
      { month: "Feb", count: 70 },
      { month: "Mar", count: 90 },
    ];

    setUserData(sampleUserData);
    setSkilledUserData(sampleSkilledUserData);
  }, []);

  const handleResourceClick = (resource: string) => {
    setSelectedResource(resource);
    setShowCharts(false);
    setAnchorEl(null);
    // Fetch content for the selected resource (Assuming it's asynchronous)
    // For demonstration, let's set some sample content
    setResourceContent([
      { id: 1, title: "Content 1", description: "Description of Content 1" },
      { id: 2, title: "Content 2", description: "Description of Content 2" },
    ]);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReply = () => {
    setOpenReplyDialog(true);
  };

  const handleCloseReplyDialog = () => {
    setOpenReplyDialog(false);
  };

  const handleBackToDashboard = () => {
    setShowCharts(true);
    setSelectedResource(null);
  };

  const handleAddContent = () => {
    // Logic to add content to the selected resource
    // For demonstration, let's simply add a new content item
    const newContent = {
      id: Math.random(),
      title: "New Content",
      description: "Description of New Content",
    };
    setResourceContent([...resourceContent, newContent]);
  };

  const handleEditContent = (id: number) => {
    // Logic to edit content based on its ID
    console.log("Editing content with ID:", id);
  };

  const handleDeleteContent = (id: number) => {
    // Logic to delete content based on its ID
    setResourceContent(resourceContent.filter((item) => item.id !== id));
  };

  const resources = [
    "Healthcare Facilities",
    "Education Centers",
    "Legal Aid Organizations",
    "Job Training Programs",
    "Community Support Services",
    "Announcements",
    "Job Vacancies",
    "Events",
    "Testimonials",
  ];

  const handleComposeClick = () => {
    setComposeOpen(true);
  };

  const handleCloseCompose = () => {
    setComposeOpen(false);
    setRecipient("");
    setMessage("");
  };

  const handleSend = () => {
    console.log("Sending message to:", recipient);
    console.log("Message content:", message);
    handleCloseCompose();
  };

  return (
    <div style={{ display: "flex" }}>
      <MyAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <MyToolbar>
          <MyLogo component={Link} to="/">
          <Avatar alt="Introduction Image" src={reach} sx={{ width: 100, height: 70 }} />
          </MyLogo>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "right"}}>
            <MyLogo>Admin Dashboard</MyLogo>
          </Typography>
        </MyToolbar>
      </MyAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <MyToolbar style={{marginTop: '60px', width: "250px", padding: "0px"}}>
          <Container>
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <Avatar
                alt="Admin"
                src="/path_to_your_image.jpg"
                sx={{ width: 100, height: 100, margin: "0 auto 10px" }}
              />
              <Typography variant="subtitle1">Admin Full Name</Typography>
              <Typography variant="body2">admin@example.com</Typography>
              <Typography variant="body2">Admin Role</Typography>
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                color="primary"
                size="small"
                style={{ marginTop: "10px" }}
              >
                Edit Profile
              </Button>
            </div>
            <Card variant="outlined" style={{ marginBottom: "20px" }}>
              <CardContent style={{ overflowY: "auto" }}>
                <Typography variant="h6" gutterBottom  style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px" }}>
                  Message Title
                </Typography>
                <Typography variant="body1" gutterBottom  style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px" }}>
                  {selectedMessage}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleComposeClick}
                >
                  Compose
                </Button>
              </CardContent>
            </Card>
            <List>
              <Button
                aria-controls="resource-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                Select Resource
              </Button>
              <Menu
                id="resource-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {resources.map((resource) => (
                  <MenuItem
                    key={resource}
                    onClick={() => handleResourceClick(resource)}
                  >
                    {resource}
                  </MenuItem>
                ))}
              </Menu>
            </List>
          </Container>
        </MyToolbar>
      </Drawer>

      <main
        style={{
          flexGrow: 1,
          padding: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {showCharts && (
          <div style={{ width: "100%" }}>
            {/* Chart for Number of Users */}
            <div style={{ width: "700px" }}>
              <Typography variant="h6">Number of Refugees</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={userData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="Refugees" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Chart for Skilled Volunteers */}
            <div style={{ width: "700px" }}>
              <Typography variant="h6">Number of Skilled Volunteers</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={skilledUserData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="#82ca9d"
                    name="Skilled Volunteers"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {!showCharts && (
          <Container style={{ width: "900px" }}>
            <Typography variant="h4">{selectedResource}</Typography>
            {resourceContent.map((item) => (
              <Card key={item.id} style={{ marginBottom: "10px" }}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body1">{item.description}</Typography>
                  <Button
                    onClick={() => handleEditContent(item.id)}
                    startIcon={<EditIcon />}
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteContent(item.id)}
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button
              onClick={handleAddContent}
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Add Content
            </Button>
            <Button
              onClick={handleBackToDashboard}
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", marginLeft: "10px" }}
            >
              Back to Dashboard
            </Button>
          </Container>
        )}
      </main>
      <Dialog open={openReplyDialog} onClose={handleCloseReplyDialog}>
        <DialogTitle>Reply to Message</DialogTitle>
        <DialogContent>
          <TextField
            label="Recipient Email"
            fullWidth
            variant="outlined"
            margin="normal"
            defaultValue="recipient@example.com"
          />
          <TextField
            label="Message"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReplyDialog}>Close</Button>
          <Button variant="contained" color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={composeOpen} onClose={handleCloseCompose}>
        <DialogTitle>Compose Message</DialogTitle>
        <DialogContent>
          <TextField
            label="Recipient Email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <TextField
            label="Message"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            margin="normal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCompose}>Close</Button>
          <Button variant="contained" color="primary" onClick={handleSend}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import {
//   Drawer,
//   AppBar,
//   Toolbar,
//   Typography,
//   List,
//   Container,
//   Button,
//   Menu,
//   MenuItem,
//   Avatar,
//   Card,
//   CardContent,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// // import ReachLogo from '../../assets/reach.svg';

// const drawerWidth = 240;

// interface UserData {
//   month: string;
//   count: number;
// }

// const Dashboard: React.FC = () => {
//   const [userData, setUserData] = useState<UserData[]>([]); // Add type annotation
//   const [skilledUserData, setSkilledUserData] = useState<UserData[]>([]);
//   const [selectedResource, setSelectedResource] = useState<string | null>(null);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedMessage, setSelectedMessage] = useState<string>(
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."
//   );
//   const [openReplyDialog, setOpenReplyDialog] = useState<boolean>(false);
//   const [showCharts, setShowCharts] = useState<boolean>(true);
//   const [resourceContent, setResourceContent] = useState<any[]>([]); // State to manage resource content

//   useEffect(() => {
//     // Sample data for demonstration
//     const sampleUserData: UserData[] = [
//       { month: "Jan", count: 100 },
//       { month: "Feb", count: 150 },
//       { month: "Mar", count: 200 },
//     ];

//     const sampleSkilledUserData: UserData[] = [
//       { month: "Jan", count: 50 },
//       { month: "Feb", count: 70 },
//       { month: "Mar", count: 90 },
//     ];

//     setUserData(sampleUserData);
//     setSkilledUserData(sampleSkilledUserData);
//   }, []);

//   const handleResourceClick = (resource: string) => {
//     setSelectedResource(resource);
//     setShowCharts(false);
//     setAnchorEl(null);

//     setResourceContent([
//       { id: 1, title: "Content 1", description: "Description of Content 1" },
//       { id: 2, title: "Content 2", description: "Description of Content 2" },
//     ]);
//   };

//   const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleReply = () => {
//     setOpenReplyDialog(true);
//   };

//   const handleCloseReplyDialog = () => {
//     setOpenReplyDialog(false);
//   };

//   const handleBackToDashboard = () => {
//     setShowCharts(true);
//     setSelectedResource(null);
//   };

//   const handleAddContent = () => {

//     const newContent = {
//       id: Math.random(),
//       title: "New Content",
//       description: "Description of New Content",
//     };
//     setResourceContent([...resourceContent, newContent]);
//   };

//   const handleEditContent = (id: number) => {

//     console.log("Editing content with ID:", id);
//   };

//   const handleDeleteContent = (id: number) => {
//     // Logic to delete content based on its ID
//     setResourceContent(resourceContent.filter((item) => item.id !== id));
//   };

//   const resources = [
//     "Healthcare Facilities",
//     "Education Centers",
//     "Legal Aid Organizations",
//     "Job Training Programs",
//     "Community Support Services",
//     "Announcements",
//     "Job Vacancies",
//     "Events",
//     "Testimonials",
//   ];

//   return (
//     <div style={{ display: "flex" }}>
//   <AppBar
//     position="fixed"
//     sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//   >
//     <Toolbar>

//       <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "right" }}>
//         Admin Dashboard
//       </Typography>
//     </Toolbar>
//   </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar />
//         <Container>
//           <div style={{ textAlign: "center", margin: "20px 0" }}>
//             <Avatar
//               alt="Admin"
//               src="/path_to_your_image.jpg"
//               sx={{ width: 100, height: 100, margin: "0 auto 10px" }}
//             />
//             <Typography variant="subtitle1">Admin Full Name</Typography>
//             <Typography variant="body2">admin@example.com</Typography>
//             <Typography variant="body2">Admin Role</Typography>
//             <Button
//               startIcon={<EditIcon />}
//               variant="outlined"
//               color="primary"
//               size="small"
//               style={{ marginTop: "10px" }}
//             >
//               Edit Profile
//             </Button>
//           </div>
//           <Card variant="outlined" style={{ marginBottom: "20px" }}>
//             <CardContent style={{ overflowY: "auto" }}>
//               <Typography variant="h6" gutterBottom>
//                 Message Title
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 {selectedMessage}
//               </Typography>
//               <Button variant="outlined" color="primary" onClick={handleReply}>
//                 Reply
//               </Button>
//             </CardContent>
//           </Card>
//           <TextField
//             label="Reply"
//             multiline
//             rows={4}
//             fullWidth
//             variant="outlined"
//             style={{ marginBottom: "20px" }}
//           />
//           <Button variant="contained" color="primary">
//             Send
//           </Button>
//           <List>
//             <Button
//               aria-controls="resource-menu"
//               aria-haspopup="true"
//               onClick={handleMenuOpen}
//             >
//               Select Resource
//             </Button>
//             <Menu
//               id="resource-menu"
//               anchorEl={anchorEl}
//               keepMounted
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//             >
//               {resources.map((resource) => (
//                 <MenuItem
//                   key={resource}
//                   onClick={() => handleResourceClick(resource)}
//                 >
//                   {resource}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </List>
//         </Container>
//       </Drawer>
//       <Toolbar />
//       <main
//         style={{
//           flexGrow: 1,
//           padding: "20px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         {showCharts && (
//           <div style={{ width: "100%" }}>
//             {/* Chart for Number of Users */}
//             <div style={{ width: "700px" }}>
//               <Typography variant="h6">Number of Refugees</Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart
//                   data={userData}
//                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="count" fill="#8884d8" name="Refugees" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//             {/* Chart for Skilled Volunteers */}
//             <div style={{ width: "700px" }}>
//               <Typography variant="h6">Number of Skilled Volunteers</Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart
//                   data={skilledUserData}
//                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar
//                     dataKey="count"
//                     fill="#82ca9d"
//                     name="Skilled Volunteers"
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}
//         {!showCharts && (
//           <Container style={{ width: "900px" }}>
//             <Typography variant="h4">{selectedResource}</Typography>
//             {resourceContent.map((item) => (
//               <Card key={item.id} style={{ marginBottom: "10px" }}>
//                 <CardContent>
//                   <Typography variant="h6">{item.title}</Typography>
//                   <Typography variant="body1">{item.description}</Typography>
//                   <Button
//                     onClick={() => handleEditContent(item.id)}
//                     startIcon={<EditIcon />}
//                     variant="outlined"
//                     color="primary"
//                     style={{ marginRight: "10px" }}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     onClick={() => handleDeleteContent(item.id)}
//                     startIcon={<DeleteIcon />}
//                     variant="outlined"
//                     color="secondary"
//                   >
//                     Delete
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//             <Button
//               onClick={handleAddContent}
//               startIcon={<AddIcon />}
//               variant="contained"
//               color="primary"
//               style={{ marginTop: "20px" }}
//             >
//               Add Content
//             </Button>
//             <Button
//               onClick={handleBackToDashboard}
//               variant="contained"
//               color="primary"
//               style={{ marginTop: "20px", marginLeft: "10px" }}
//             >
//               Back to Dashboard
//             </Button>
//           </Container>
//         )}
//       </main>
//       <Dialog open={openReplyDialog} onClose={handleCloseReplyDialog}>
//         <DialogTitle>Reply to Message</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Recipient Email"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             defaultValue="recipient@example.com"
//           />
//           <TextField
//             label="Message"
//             multiline
//             rows={4}
//             fullWidth
//             variant="outlined"
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseReplyDialog}>Close</Button>
//           <Button variant="contained" color="primary">
//             Send
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { Drawer, AppBar, Toolbar, Typography, List, Container, Button, Menu, MenuItem, Avatar, Card, CardContent, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const drawerWidth = 240;

// const Dashboard: React.FC = () => {
//   const [userData, setUserData] = useState([]);
//   const [skilledUserData, setSkilledUserData] = useState([]);
//   const [selectedResource, setSelectedResource] = useState<string | null>(null);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedMessage, setSelectedMessage] = useState<string>("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.");
//   const [openReplyDialog, setOpenReplyDialog] = useState<boolean>(false);
//   const [showCharts, setShowCharts] = useState<boolean>(true);

//   useEffect(() => {
//     // Sample data for demonstration
//     const sampleUserData = [
//       { month: 'Jan', count: 100 },
//       { month: 'Feb', count: 150 },
//       { month: 'Mar', count: 200 },
//     ];

//     const sampleSkilledUserData = [
//       { month: 'Jan', count: 50 },
//       { month: 'Feb', count: 70 },
//       { month: 'Mar', count: 90 },
//     ];

//     setUserData(sampleUserData);
//     setSkilledUserData(sampleSkilledUserData);
//   }, []);

//   const handleResourceClick = (resource: string) => {
//     setSelectedResource(resource);
//     setShowCharts(false);
//     setAnchorEl(null);
//   };

//   const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleReply = () => {
//     setOpenReplyDialog(true);
//   };

//   const handleCloseReplyDialog = () => {
//     setOpenReplyDialog(false);
//   };

//   const handleBackToDashboard = () => {
//     setShowCharts(true);
//     setSelectedResource(null);
//   };

//   const resources = [
//     "Healthcare Facilities",
//     "Education Centers",
//     "Legal Aid Organizations",
//     "Job Training Programs",
//     "Community Support Services",
//     "Announcements",
//     "Job Vacancies",
//     "Events",
//     "Testimonials"
//   ];

//   return (
//     <div style={{ display: 'flex' }}>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap>
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar />
//         <Container>
//           <div style={{ textAlign: 'center', margin: '20px 0' }}>
//             <Avatar alt="Admin" src="/path_to_your_image.jpg" sx={{ width: 100, height: 100, margin: '0 auto 10px' }} />
//             <Typography variant="subtitle1">Admin Full Name</Typography>
//             <Typography variant="body2">admin@example.com</Typography>
//             <Typography variant="body2">Admin Role</Typography>
//             <Button startIcon={<EditIcon />} variant="outlined" color="primary" size="small" style={{ marginTop: '10px' }}>Edit Profile</Button>
//           </div>
//           <Card variant="outlined" style={{ marginBottom: '20px' }}>
//             <CardContent style={{ overflowY: 'auto' }}>
//               <Typography variant="h6" gutterBottom>
//                 Message Title
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 {selectedMessage}
//               </Typography>
//               <Button variant="outlined" color="primary" onClick={handleReply}>Reply</Button>
//             </CardContent>
//           </Card>
//           <TextField
//             label="Reply"
//             multiline
//             rows={4}
//             fullWidth
//             variant="outlined"
//             style={{ marginBottom: '20px' }}
//           />
//           <Button variant="contained" color="primary">Send</Button>
//           <List>
//             <Button aria-controls="resource-menu" aria-haspopup="true" onClick={handleMenuOpen}>
//               Select Resource
//             </Button>
//             <Menu
//               id="resource-menu"
//               anchorEl={anchorEl}
//               keepMounted
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//             >
//               {resources.map((resource) => (
//                 <MenuItem key={resource} onClick={() => handleResourceClick(resource)}>
//                   {resource}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </List>
//         </Container>
//       </Drawer>
//       <main style={{ flexGrow: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//         <Toolbar />
//         {showCharts && (
//           <div style={{ width: '100%' }}>
//             {/* Chart for Number of Users */}
//             <div>
//               <Typography variant="h6">Number of Refugees</Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart
//                   data={userData}
//                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="count" fill="#8884d8" name="Refugees" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//             {/* Chart for Skilled Volunteers */}
//             <div>
//               <Typography variant="h6">Number of Skilled Volunteers</Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart
//                   data={skilledUserData}
//                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="count" fill="#82ca9d" name="Skilled Volunteers" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}
//         {!showCharts && (
//           <Container>
//             <Typography variant="h4">{selectedResource}</Typography>
//             <Button onClick={handleBackToDashboard} variant="contained" color="primary" style={{ marginTop: '20px' }}>Back to Dashboard</Button>
//             {/* Additional content related to the selected resource */}
//           </Container>
//         )}
//       </main>
//       <Dialog open={openReplyDialog} onClose={handleCloseReplyDialog}>
//         <DialogTitle>Reply to Message</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Recipient Email"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             defaultValue="recipient@example.com"
//           />
//           <TextField
//             label="Message"
//             multiline
//             rows={4}
//             fullWidth
//             variant="outlined"
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseReplyDialog}>Close</Button>
//           <Button variant="contained" color="primary">Send</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default Dashboard;
