import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Button,
  InputAdornment, // Import InputAdornment
} from "@mui/material";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";

// Define your custom blue and white colors
const blueColor = "#2196f3";
const whiteColor = "#ffffff";

interface Resource {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

interface JobVacancy {
  title: string;
  description: string;
}

interface Event {
  title: string;
  time: string;
  location: string;
}

interface User {
  imageUrl: string;
  name: string;
  email: string;
  role: string;
}

interface Testimonial {
  imageUrl: string;
  name: string;
  job: string;
  email: string;
  phone: string;
  info: string;
}

const ProfileCard: React.FC<{ user: User }> = ({ user }) => (
  <Card sx={{ marginBottom: "20px", boxShadow: 4 }}>
    <CardContent sx={{ display: "flex", alignItems: "center" }}>
      <img
        src={user.imageUrl}
        alt="User"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
      <div style={{ marginLeft: "20px" }}>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body1" color="textSecondary">
          {user.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user.role}
        </Typography>
        <Button variant="contained" color="primary">
          Edit
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Rest of the component remains unchanged

const ResourceDashboard: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentVacancyIndex, setCurrentVacancyIndex] = useState<number>(0);

  const jobVacancies: JobVacancy[] = [
    { title: "Job Vacancy 1", description: "Description for Job Vacancy 1" },
    { title: "Job Vacancy 2", description: "Description for Job Vacancy 2" },
    { title: "Job Vacancy 3", description: "Description for Job Vacancy 3" },
  ];

  const events: Event[] = [
    {
      title: "Event 1",
      time: "10:00 AM",
      location: "Location 1",
    },
    {
      title: "Event 2",
      time: "02:00 PM",
      location: "Location 2",
    },
  ];

  const user: User = {
    imageUrl: "user.jpg",
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
  };

  const resources: Resource[] = [
    {
      id: 1,
      title: "News",
      content: "Latest news and updates",
      imageUrl: "news.jpg",
    },
    {
      id: 2,
      title: "Health Care Facilities",
      content: "Content of Resource 2",
      imageUrl: "image2.jpg",
    },
    {
      id: 3,
      title: "Educational Center",
      content: "Content of Resource 2",
      imageUrl: "image2.jpg",
    },
    {
      id: 4,
      title: "Legal Aid Organization",
      content: "Content of Resource 2",
      imageUrl: "image2.jpg",
    },
    {
      id: 5,
      title: "Job Training Programs",
      content: "Content of Resource 2",
      imageUrl: "image2.jpg",
    },
    {
      id: 6,
      title: "Community Support Service",
      content: "Content of Resource 2",
      imageUrl: "image2.jpg",
    },
    {
      id: 7,
      title: "Announcements",
      content: "Content of Resource 2",
      imageUrl: "image2.jpg",
    },

    // Add more resources here
  ];

  const testimonials: Testimonial[] = [
    {
      imageUrl: "person1.jpg",
      name: "Jane Smith",
      job: "Marketing Manager",
      email: "jane@example.com",
      phone: "123-456-7890",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit",
    },
    {
      imageUrl: "person2.jpg",
      name: "Michael Johnson",
      job: "Sales Director",
      email: "michael@example.com",
      phone: "987-654-3210",
      info: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      imageUrl: "person2.jpg",
      name: "Michael Johnson",
      job: "Sales Director",
      email: "michael@example.com",
      phone: "987-654-3210",
      info: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    // Add more testimonials here
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVacancyIndex(
        (prevIndex) => (prevIndex + 1) % jobVacancies.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [resources]);

  const handleResourceSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const resourceId = parseInt(event.target.value as string, 10);
    const selected = resources.find((resource) => resource.id === resourceId);
    if (selected) {
      setSelectedResource(selected);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <div style={{ marginBottom: "30px" }}>
            <ProfileCard user={user} />
            <Typography
                variant="h6"
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  // backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  textDecoration: 'none',
                   color: '#0070f4'
                }}
                component={Link}
                to={"/StudentDashEnrollement"}
              >
                My Learning
              </Typography>
            <FormControl fullWidth style={{marginTop:"10px"}}>
              <InputLabel
                id="resource-select-label"
                style={{ marginBottom: "30px", marginTop:"20px" }}
              >
                Select Resource
              </InputLabel>
            
              <Select
                labelId="resource-select-label"
                value={selectedResource ? selectedResource.id : ""}
                onChange={handleResourceSelect}
              >
                {resources.map((resource) => (
                  <MenuItem key={resource.id} value={resource.id}>
                    {resource.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          

            <Card sx={{ boxShadow: 4 }}>
              <CardContent
                style={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: "200px",
                }}
              >
                <div>
                  <Typography
                    variant="h5"
                    style={{ marginBottom: "8px", color: blueColor }}
                  >
                    {jobVacancies[currentVacancyIndex].title}
                  </Typography>
                  <Typography style={{ color: blueColor }}>
                    {jobVacancies[currentVacancyIndex].description}
                  </Typography>
                </div>
              </CardContent>
            </Card>
            <Card
              sx={{
                marginTop: "30px",
                boxShadow: 4,
                backgroundColor: whiteColor,
              }}
            >
              <CardContent style={{ maxHeight: "200px", overflowY: "auto" }}>
                <Typography variant="h6" style={{ color: blueColor }}>
                  Events
                </Typography>
                {events.map((event, index) => (
                  <div key={index}>
                    <Typography
                      variant="subtitle1"
                      style={{ color: blueColor }}
                    >
                      {event.title}
                    </Typography>
                    <Typography variant="body2" style={{ color: blueColor }}>
                      Time: {event.time}
                    </Typography>
                    <Typography variant="body2" style={{ color: blueColor }}>
                      Location: {event.location}
                    </Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div style={{ height: "600px", overflowY: "auto" }}>
            <TextField
              label="Search within resources"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src="logo.png"
                      alt="Logo"
                      style={{ width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="contained" color="primary">
                      Search
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            {selectedResource && (
              <div>
                <Typography variant="h5" style={{ color: blueColor }}>
                  {selectedResource.title}
                </Typography>
                <Typography variant="body1" style={{ color: blueColor }}>
                  {selectedResource.content}
                </Typography>
                <img
                  src={selectedResource.imageUrl}
                  alt={selectedResource.title}
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
            {!selectedResource && (
              <div>
                <Typography variant="h5" style={{ color: blueColor }}>
                  Search Results
                </Typography>
                {filteredResources.map((resource) => (
                  <div key={resource.id}>
                    <Typography variant="h6" style={{ color: blueColor }}>
                      {resource.title}
                    </Typography>
                    <Typography variant="body2" style={{ color: blueColor }}>
                      {resource.content}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div>
          <Typography
            variant="h4"
            style={{ color: blueColor, margin: "20px 0" }}
          >
            Skilled Volunteers Ready To help you
          </Typography>
          <Grid container spacing={2}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={4} key={index}>
                <Card sx={{ marginBottom: "20px", boxShadow: 4 }}>
                  <CardContent>
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        margin: "auto",
                        marginBottom: "10px",
                      }}
                    />
                    <Typography variant="h6" style={{ color: blueColor }}>
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{ color: blueColor }}
                    >
                      {testimonial.job}
                    </Typography>
                    <Typography variant="body2" style={{ color: blueColor }}>
                      Email: {testimonial.email}
                    </Typography>
                    <Typography variant="body2" style={{ color: blueColor }}>
                      Phone: {testimonial.phone}
                    </Typography>
                    <Typography variant="body1" style={{ color: blueColor }}>
                      {testimonial.info}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{ marginTop: "30px", boxShadow: 4, backgroundColor: whiteColor }}
        >
          <CardContent>
            <Typography variant="h4" style={{ color: blueColor }}>
              Reach NGO - Empowering Communities
            </Typography>
            <Typography variant="body1" style={{ color: blueColor }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </Typography>
            {/* Add any additional content or call-to-action buttons here */}
          </CardContent>
        </Card>
      </Grid>

      <Draggable>
        <Card
          sx={{
            marginTop: "30px",
            position: "absolute",
            right: "20px",
            bottom: "20px",
            zIndex: 999,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adjust the shadow according to your preference
            backgroundColor: whiteColor,
          }}
        >
          <CardContent
            style={{
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h6"
              style={{ marginBottom: "10px", color: blueColor }}
            >
              Messaging Panel
            </Typography>
            <TextField
              label="Write your message"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              style={{ marginBottom: "10px" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Reply
              </Button>
              <Button variant="contained" color="primary">
                Send
              </Button>
            </div>
          </CardContent>
          <div
            style={{
              padding: "20px",
              borderRadius: "10px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h6"
              style={{ marginBottom: "10px", color: blueColor }}
            >
              Received Messages
            </Typography>
            <div style={{ marginBottom: "10px" }}>
              <Typography variant="subtitle2" style={{ color: blueColor }}>
                Sender: John Doe
              </Typography>
              <Typography variant="body1" style={{ color: blueColor }}>
                This is a received message.
              </Typography>
            </div>
          </div>
        </Card>
      </Draggable>
    </Container>
  );
};

export default ResourceDashboard;

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   Grid,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Card,
//   CardContent,
//   Button,
// } from "@mui/material";
// import Draggable from "react-draggable"; // Import Draggable component

// interface Resource {
//   id: number;
//   title: string;
//   content: string;
//   imageUrl: string;
// }

// interface JobVacancy {
//   title: string;
//   description: string;
// }

// interface Event {
//   title: string;
//   time: string;
//   location: string;
// }

// interface User {
//   imageUrl: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface Testimonial {
//   imageUrl: string;
//   name: string;
//   job: string;
//   email: string;
//   phone: string;
//   info: string;
// }

// const ProfileCard: React.FC<{ user: User }> = ({ user }) => (
//   <Card sx={{ marginBottom: "20px", boxShadow: 4 }}>
//     <CardContent sx={{ display: "flex", alignItems: "center" }}>
//       <img
//         src={user.imageUrl}
//         alt="User"
//         style={{ width: "50px", height: "50px", borderRadius: "50%" }}
//       />
//       <div style={{ marginLeft: "20px" }}>
//         <Typography variant="h6">{user.name}</Typography>
//         <Typography variant="body1" color="textSecondary">
//           {user.email}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           {user.role}
//         </Typography>
//         <Button variant="contained" color="primary">
//           Edit
//         </Button>
//       </div>
//     </CardContent>
//   </Card>
// );

// const ResourceDashboard: React.FC = () => {
//   const [selectedResource, setSelectedResource] = useState<Resource | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [currentVacancyIndex, setCurrentVacancyIndex] = useState<number>(0);

//   const jobVacancies: JobVacancy[] = [
//     { title: "Job Vacancy 1", description: "Description for Job Vacancy 1" },
//     { title: "Job Vacancy 2", description: "Description for Job Vacancy 2" },
//     { title: "Job Vacancy 3", description: "Description for Job Vacancy 3" },
//   ];

//   const events: Event[] = [
//     {
//       title: "Event 1",
//       time: "10:00 AM",
//       location: "Location 1",
//     },
//     {
//       title: "Event 2",
//       time: "02:00 PM",
//       location: "Location 2",
//     },
//   ];

//   const user: User = {
//     imageUrl: "user.jpg",
//     name: "John Doe",
//     email: "john@example.com",
//     role: "Developer",
//   };

//   const resources: Resource[] = [
//     {
//       id: 1,
//       title: "News",
//       content: "Latest news and updates",
//       imageUrl: "news.jpg",
//     },
//     {
//       id: 2,
//       title: "Health Care Facilities",
//       content: "Content of Resource 2",
//       imageUrl: "image2.jpg",
//     },
//     {
//       id: 3,
//       title: "Educational Center",
//       content: "Content of Resource 2",
//       imageUrl: "image2.jpg",
//     },
//     {
//       id: 4,
//       title: "Legal Aid Organization",
//       content: "Content of Resource 2",
//       imageUrl: "image2.jpg",
//     },
//     {
//       id: 5,
//       title: "Job Training Programs",
//       content: "Content of Resource 2",
//       imageUrl: "image2.jpg",
//     },
//     {
//       id: 6,
//       title: "Community Support Service",
//       content: "Content of Resource 2",
//       imageUrl: "image2.jpg",
//     },
//     {
//       id: 7,
//       title: "Announcements",
//       content: "Content of Resource 2",
//       imageUrl: "image2.jpg",
//     },

//     // Add more resources here
//   ];

//   const testimonials: Testimonial[] = [
//     {
//       imageUrl: "person1.jpg",
//       name: "Jane Smith",
//       job: "Marketing Manager",
//       email: "jane@example.com",
//       phone: "123-456-7890",
//       info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     },
//     {
//       imageUrl: "person2.jpg",
//       name: "Michael Johnson",
//       job: "Sales Director",
//       email: "michael@example.com",
//       phone: "987-654-3210",
//       info: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       imageUrl: "person2.jpg",
//       name: "Michael Johnson",
//       job: "Sales Director",
//       email: "michael@example.com",
//       phone: "987-654-3210",
//       info: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     // Add more testimonials here
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentVacancyIndex(
//         (prevIndex) => (prevIndex + 1) % jobVacancies.length
//       );
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [resources]);

//   const handleResourceSelect = (
//     event: React.ChangeEvent<{ value: unknown }>
//   ) => {
//     const resourceId = parseInt(event.target.value as string, 10);
//     const selected = resources.find((resource) => resource.id === resourceId);
//     if (selected) {
//       setSelectedResource(selected);
//     }
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredResources = resources.filter((resource) =>
//     resource.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container maxWidth="xl">
//       <Grid container spacing={3}>
//         <Grid item xs={4}>
//           <div style={{ marginBottom: "30px" }}>
//             <ProfileCard user={user} />
//             <FormControl fullWidth>
//               <InputLabel
//                 id="resource-select-label"
//                 style={{ marginBottom: "30px" }}
//               >
//                 Select Resource
//               </InputLabel>
//               <Select
//                 labelId="resource-select-label"
//                 value={selectedResource ? selectedResource.id : ""}
//                 onChange={handleResourceSelect}
//               >
//                 {resources.map((resource) => (
//                   <MenuItem key={resource.id} value={resource.id}>
//                     {resource.title}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <Card sx={{ boxShadow: 4 }}>
//               <CardContent
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   minHeight: "200px",
//                 }}
//               >
//                 <div>
//                   <Typography
//                     variant="h5"
//                     style={{ marginBottom: "8px", color: "#2196f3" }}
//                   >
//                     {jobVacancies[currentVacancyIndex].title}
//                   </Typography>
//                   <Typography>
//                     {jobVacancies[currentVacancyIndex].description}
//                   </Typography>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card
//               sx={{
//                 marginTop: "30px",
//                 boxShadow: 4,
//                 backgroundColor: "#ffffff",
//               }}
//             >
//               <CardContent style={{ maxHeight: "200px", overflowY: "auto" }}>
//                 <Typography variant="h6">Events</Typography>
//                 {events.map((event, index) => (
//                   <div key={index}>
//                     <Typography variant="subtitle1">{event.title}</Typography>
//                     <Typography variant="body2">Time: {event.time}</Typography>
//                     <Typography variant="body2">
//                       Location: {event.location}
//                     </Typography>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>
//         </Grid>
//         <Grid item xs={8}>
//           <div style={{ height: "600px", overflowY: "auto" }}>
//             <TextField
//               label="Search within resources"
//               variant="outlined"
//               fullWidth
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             {selectedResource && (
//               <div>
//                 <Typography variant="h5">{selectedResource.title}</Typography>
//                 <Typography variant="body1">
//                   {selectedResource.content}
//                 </Typography>
//                 <img
//                   src={selectedResource.imageUrl}
//                   alt={selectedResource.title}
//                   style={{ maxWidth: "100%" }}
//                 />
//               </div>
//             )}
//             {!selectedResource && (
//               <div>
//                 <Typography variant="h5">Search Results</Typography>
//                 {filteredResources.map((resource) => (
//                   <div key={resource.id}>
//                     <Typography variant="h6">{resource.title}</Typography>
//                     <Typography variant="body2">{resource.content}</Typography>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Grid>
//       </Grid>
//       <Grid item xs={12}>
//         <div>
//           <Typography
//             variant="h4"
//             style={{ color: "#2196f3", margin: "20px 0" }}
//           >
//             Skilled Volunteers Ready To help you
//           </Typography>
//           <Grid container spacing={2}>
//             {testimonials.map((testimonial, index) => (
//               <Grid item xs={4} key={index}>
//                 <Card sx={{ marginBottom: "20px", boxShadow: 4 }}>
//                   <CardContent>
//                     <img
//                       src={testimonial.imageUrl}
//                       alt={testimonial.name}
//                       style={{
//                         width: "100px",
//                         height: "100px",
//                         borderRadius: "50%",
//                         margin: "auto",
//                         marginBottom: "10px",
//                       }}
//                     />
//                     <Typography variant="h6">{testimonial.name}</Typography>
//                     <Typography variant="subtitle1">
//                       {testimonial.job}
//                     </Typography>
//                     <Typography variant="body2">
//                       Email: {testimonial.email}
//                     </Typography>
//                     <Typography variant="body2">
//                       Phone: {testimonial.phone}
//                     </Typography>
//                     <Typography variant="body1">{testimonial.info}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </div>
//       </Grid>
//       <Grid item xs={12}>
//         <Card sx={{ marginTop: "30px", boxShadow: 4 }}>
//           <CardContent>
//             <Typography variant="h4">
//               Reach NGO - Empowering Communities
//             </Typography>
//             <Typography variant="body1">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//               enim ad minim veniam.
//             </Typography>
//             {/* Add any additional content or call-to-action buttons here */}
//           </CardContent>
//         </Card>
//       </Grid>

//       <Draggable>
//         <Card
//           sx={{
//             marginTop: "30px",
//             position: "absolute",
//             right: "20px",
//             bottom: "20px",
//             zIndex: 999,
//             boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adjust the shadow according to your preference
//             backgroundColor: "#ffffff",
//           }}
//         >
//           <CardContent
//             style={{
//               padding: "20px",
//               borderRadius: "10px",
//               marginBottom: "20px",
//             }}
//           >
//             <Typography
//               variant="h6"
//               style={{ marginBottom: "10px", color: "#2196f3" }}
//             >
//               Messaging Panel
//             </Typography>
//             <TextField
//               label="Write your message"
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={3}
//               style={{ marginBottom: "10px" }}
//             />
//             <div style={{ display: "flex", justifyContent: "flex-end" }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 style={{ marginRight: "10px" }}
//               >
//                 Reply
//               </Button>
//               <Button variant="contained" color="primary">
//                 Send
//               </Button>
//             </div>
//           </CardContent>
//           <div
//             style={{
//               padding: "20px",
//               borderRadius: "10px",
//               maxHeight: "200px",
//               overflowY: "auto",
//             }}
//           >
//             <Typography
//               variant="h6"
//               style={{ marginBottom: "10px", color: "#2196f3" }}
//             >
//               Received Messages
//             </Typography>
//             <div style={{ marginBottom: "10px" }}>
//               <Typography variant="subtitle2">Sender: John Doe</Typography>
//               <Typography variant="body1">
//                 This is a received message.
//               </Typography>
//             </div>
//           </div>
//         </Card>
//       </Draggable>
//     </Container>
//   );
// };

// export default ResourceDashboard;
