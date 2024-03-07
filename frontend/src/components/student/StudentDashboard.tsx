import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { MyAppBar, MyLogo, MyToolbar } from "../../utils/StyledComps";
import { Link } from "react-router-dom";

interface Scholarship {
  name: string;
  scholarship: string;
  startDate: string;
  description: string;
  fields: string[];
}

interface ScholarshipDetailsModalProps {
  open: boolean;
  onClose: () => void;
  scholarship: Scholarship | null;
}

const ScholarshipDetailsModal: React.FC<ScholarshipDetailsModalProps> = ({
  open,
  onClose,
  scholarship,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" id="modal-modal-title">
          {scholarship?.name} Details
        </Typography>
        <Typography variant="body1" id="modal-modal-description" sx={{ mt: 2 }}>
          {scholarship && (
            <>
              <p>Scholarship: {scholarship.scholarship}</p>
              <p>Start Date: {scholarship.startDate}</p>
              <p>Description: {scholarship.description}</p>
              <p>Fields: {scholarship.fields.join(", ")}</p>
            </>
          )}
        </Typography>
      </Box>
    </Modal>
  );
};

const StudentDashboard: React.FC = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [selectedScholarship, setSelectedScholarship] =
    useState<Scholarship | null>(null);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [selectedCourseForEnrollment, setSelectedCourseForEnrollment] =
    useState<any>(null);

  const [comment, setComment] = useState("");
  const [receiver, setReceiver] = useState("");
  // Simulated data fetching - Replace with actual data fetching logic
  useEffect(() => {
    // Simulating data fetch after 1 second
    const timer = setTimeout(() => {
      // Simulated enrolled courses
      const courses = [
        "Course 1",
        "Course 2",
        "Course 3",
        "Course 4",
        "Course 5",
      ];
      setEnrolledCourses(courses);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const availableCourses = [
    {
      name: "Course A",
      hours: 10,
      days: 3,
      description: "Course A description",
      instructors: ["Instructor A", "Instructor B"],
    },
    {
      name: "Course B",
      hours: 8,
      days: 2,
      description: "Course B description",
      instructors: ["Instructor C", "Instructor D"],
    },
    {
      name: "Course c",
      hours: 10,
      days: 3,
      description: "Course A description",
      instructors: ["Instructor A", "Instructor B"],
    },
    {
      name: "Course D",
      hours: 8,
      days: 2,
      description: "Course B description",
      instructors: ["Instructor C", "Instructor D"],
    },
    {
      name: "Course E",
      hours: 10,
      days: 3,
      description: "Course A description",
      instructors: ["Instructor A", "Instructor B"],
    },
    {
      name: "Course F",
      hours: 8,
      days: 2,
      description: "Course B description",
      instructors: ["Instructor C", "Instructor D"],
    },

    // Add more courses as needed
  ];

  const scholarshipUniversities: Scholarship[] = [
    {
      name: "University A",
      scholarship: "Full scholarship for refugees",
      startDate: "2024-09-01",
      description: "Detailed description of scholarship from University A.",
      fields: ["Field 1", "Field 2", "Field 3"],
    },
    {
      name: "University B",
      scholarship: "Full scholarship for refugees",
      startDate: "2024-09-01",
      description: "Detailed description of scholarship from University A.",
      fields: ["Field 1", "Field 2", "Field 3"],
    },
    {
      name: "University C",
      scholarship: "Full scholarship for refugees",
      startDate: "2024-09-01",
      description: "Detailed description of scholarship from University A.",
      fields: ["Field 1", "Field 2", "Field 3"],
    },
    // Add more scholarship universities as needed
  ];

  // Handle continue button click
//   const handleContinue = (courseName: string) => {
//     console.log("Continue button clicked for course:", courseName);
//     // Add logic to handle continue action for the course
//   };

  // Function to handle showing detailed scholarship information
  const handleShowDetails = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
  };

  // Function to handle closing detailed scholarship information
  const handleCloseDetails = () => {
    setSelectedScholarship(null);
  };

  const handleOpenEnrollmentModal = (course: any) => {
    setSelectedCourseForEnrollment(course);
    setEnrollmentModalOpen(true);
  };

  const handleCloseEnrollmentModal = () => {
    setSelectedCourseForEnrollment(null);
    setEnrollmentModalOpen(false);
  };

  const handleEnrollCourse = () => {
    // Add logic to enroll in the selected course
    console.log("Enrolling in course:", selectedCourseForEnrollment.name);
    // Close the modal after enrollment
    handleCloseEnrollmentModal();
  };
  const handleCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  const handleReceiverChange = (event: any) => {
    setReceiver(event.target.value);
  };

  const handleSendComment = () => {
    // Logic to send comment
    console.log("Sending comment:", comment);
    console.log("Receiver:", receiver);
    // Clear the fields after sending
    setComment("");
    setReceiver("");
  };
  return (
    <div style={{ width: "100%" }}>
      {/* Header */}
      <MyAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <MyToolbar>
          <MyLogo component={Link} to="/resources">
            Reach
          </MyLogo>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "right" }}>
            <MyLogo>Student Dashboard</MyLogo>
          </Typography>
        </MyToolbar>
      </MyAppBar>

      {/* Content */}
      <Container maxWidth="xl" sx={{ paddingTop: "64px" }}>
        <Grid container spacing={3}>
          {/* Enrolled Courses Section */}
          <Grid item xs={12}>
            <Paper
              style={{ padding: "20px", height: "200px", overflowY: "auto" }}
            >
              <Typography variant="h6">Enrolled Courses</Typography>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {enrolledCourses.map((course, index) => (
                  <Card
                    key={index}
                    style={{ width: "100%", marginBottom: "20px" }}
                  >
                    <CardContent>
                      <CardHeader title={course} />
                      <Typography variant="body1">
                        Description: Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit.
                      </Typography>
                      <Typography variant="body2">Progress: 50%</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/StudentDashboardInteract"
                      >
                        Continue
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Paper>
          </Grid>

          {/* Scholarship Universities Section */}
          <Grid item xs={12}>
            <Paper style={{ padding: "20px" }}>
              <Typography variant="h6">Scholarship Universities</Typography>
              <Grid container spacing={3}>
                {scholarshipUniversities.map((university, index) => (
                  <Grid key={index} item xs={12} sm={4}>
                    <Card style={{ minWidth: 200, marginBottom: 20 }}>
                      <CardContent>
                        <Typography variant="h6">{university.name}</Typography>
                        <Typography variant="body1">
                          Scholarship: {university.scholarship}
                        </Typography>
                        <Typography variant="body1">
                          Start Date: {university.startDate}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleShowDetails(university)}
                        >
                          Show Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Available Courses Section */}
          <Grid item xs={12}>
            <Paper style={{ padding: "20px" }}>
              <Typography variant="h6">Available Courses</Typography>
              <Grid container spacing={3}>
                {availableCourses.map((course, index) => (
                  <Grid key={index} item xs={12} sm={4}>
                    <Card style={{ minWidth: 200, marginBottom: 20 }}>
                      <CardContent>
                        <Typography variant="h6">{course.name}</Typography>
                        <Typography variant="body1">
                          Hours: {course.hours}
                        </Typography>
                        <Typography variant="body1">
                          Days: {course.days}
                        </Typography>
                        <Typography variant="body1">
                          Description: {course.description}
                        </Typography>
                        <Typography variant="body1">
                          Instructors: {course.instructors.join(", ")}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenEnrollmentModal(course)}
                        >
                          Show Course
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          {/* Comment Section */}
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Comment Section
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Receiver"
                      value={receiver}
                      onChange={handleReceiverChange}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Your Comment"
                      multiline
                      rows={4}
                      value={comment}
                      onChange={handleCommentChange}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSendComment}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Scholarship Details Modal */}
      <ScholarshipDetailsModal
        open={Boolean(selectedScholarship)}
        onClose={handleCloseDetails}
        scholarship={selectedScholarship}
      />
      <Modal
        open={enrollmentModalOpen}
        onClose={handleCloseEnrollmentModal}
        aria-labelledby="enrollment-modal-title"
        aria-describedby="enrollment-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="enrollment-modal-title">
            Course Enrollment
          </Typography>
          {selectedCourseForEnrollment && (
            <>
              <Typography variant="body1" id="enrollment-modal-description">
                <strong>Name:</strong> {selectedCourseForEnrollment.name}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong>{" "}
                {selectedCourseForEnrollment.description}
              </Typography>
              <Typography variant="body1">
                <strong>Hours:</strong> {selectedCourseForEnrollment.hours}
              </Typography>
              <Typography variant="body1">
                <strong>Days:</strong> {selectedCourseForEnrollment.days}
              </Typography>
              <Typography variant="body1">
                <strong>Instructors:</strong>{" "}
                {selectedCourseForEnrollment.instructors.join(", ")}
              </Typography>
            </>
          )}
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleEnrollCourse}
            >
              Enroll
            </Button>
            <Button variant="contained" onClick={handleCloseEnrollmentModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default StudentDashboard;

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Card,
//   CardContent,
//   CardHeader,
//   Button,
//   Modal,
//   Box,
// } from "@mui/material";
// import { MyAppBar, MyLogo, MyToolbar } from "../../utils/StyledComps";
// import { Link } from "react-router-dom";

// interface Scholarship {
//     name: string;
//     scholarship: string;
//     startDate: string;
//     description: string;
//     fields: string[];
//   }

//   interface ScholarshipDetailsModalProps {
//     open: boolean;
//     onClose: () => void;
//     scholarship: Scholarship | null;
//   }

//   const ScholarshipDetailsModal: React.FC<ScholarshipDetailsModalProps> = ({ open, onClose, scholarship }) => {
//     return (
//       <Modal
//         open={open}
//         onClose={onClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: 'background.paper',
//           border: '2px solid #000',
//           boxShadow: 24,
//           p: 4,
//         }}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             {scholarship?.name} Details
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             {scholarship && (
//               <>
//                 <p>Scholarship: {scholarship.scholarship}</p>
//                 <p>Start Date: {scholarship.startDate}</p>
//                 <p>Description: {scholarship.description}</p>
//                 <p>Fields: {scholarship.fields.join(', ')}</p>
//               </>
//             )}
//           </Typography>
//         </Box>
//       </Modal>
//     );
//   };

// const StudentDashboard: React.FC = () => {
//   const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
//   const [currentCourseIndex, setCurrentCourseIndex] = useState<number>(0);
//   const [selectedScholarship, setSelectedScholarship] = useState<any>(null);

//   // Simulated data fetching - Replace with actual data fetching logic
//   useEffect(() => {
//     // Simulating data fetch after 1 second
//     const timer = setTimeout(() => {
//       // Simulated enrolled courses
//       const courses = [
//         "Course 1",
//         "Course 2",
//         "Course 3",
//         "Course 4",
//         "Course 5",
//       ];
//       setEnrolledCourses(courses);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const scholarshipUniversities = [
//     {
//       name: "University A",
//       scholarship: "Full scholarship for refugees",
//       imageUrl: "url_to_image_A",
//       startDate: "2024-09-01",
//       description: "Detailed description of scholarship from University A.",
//       fields: ["Field 1", "Field 2", "Field 3"],
//     },
//     {
//         name: "University B",
//         scholarship: "Full scholarship for refugees",
//         imageUrl: "url_to_image_A",
//         startDate: "2024-09-01",
//         description: "Detailed description of scholarship from University A.",
//         fields: ["Field 1", "Field 2", "Field 3"],
//       },
//       {
//         name: "University C",
//         scholarship: "Full scholarship for refugees",
//         imageUrl: "url_to_image_A",
//         startDate: "2024-09-01",
//         description: "Detailed description of scholarship from University A.",
//         fields: ["Field 1", "Field 2", "Field 3"],
//       },
//     // Add more scholarship universities as needed
//   ];

//   // Mock list of available courses
//   const availableCourses = [
//     {
//       name: "Course A",
//       hours: 10,
//       days: 3,
//       description: "Course A description",
//       instructors: ["Instructor A", "Instructor B"],
//     },
//     {
//       name: "Course B",
//       hours: 8,
//       days: 2,
//       description: "Course B description",
//       instructors: ["Instructor C", "Instructor D"],
//     },
//     {
//       name: "Course C",
//       hours: 12,
//       days: 4,
//       description: "Course C description",
//       instructors: ["Instructor E", "Instructor F"],
//     },
//     {
//       name: "Course D",
//       hours: 6,
//       days: 1,
//       description: "Course D description",
//       instructors: ["Instructor G", "Instructor H"],
//     },
//     {
//       name: "Course E",
//       hours: 8,
//       days: 2,
//       description: "Course E description",
//       instructors: ["Instructor I", "Instructor J"],
//     },
//     {
//       name: "Course F",
//       hours: 12,
//       days: 3,
//       description: "Course F description",
//       instructors: ["Instructor K", "Instructor L"],
//     },
//     {
//       name: "Course G",
//       hours: 6,
//       days: 1,
//       description: "Course G description",
//       instructors: ["Instructor M", "Instructor N"],
//     },
//     {
//       name: "Course H",
//       hours: 10,
//       days: 4,
//       description: "Course H description",
//       instructors: ["Instructor O", "Instructor P"],
//     },
//   ];

//   const handleShowDetails = (scholarship: any) => {
//     setSelectedScholarship(scholarship);
//   };

//   // Function to handle closing detailed scholarship information
//   const handleCloseDetails = () => {
//     setSelectedScholarship(null);
//   };

//   // Handle continue button click
//   const handleContinue = (courseName: string) => {
//     console.log("Continue button clicked for course:", courseName);
//     // Add logic to handle continue action for the course
//   };

//   // Handle scroll event for enrolled courses section
//   const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
//     const element = event.target as HTMLDivElement;
//     const scrollPosition = element.scrollTop;
//     const courseIndex = Math.min(
//       Math.floor(scrollPosition / 320),
//       enrolledCourses.length - 1
//     );
//     setCurrentCourseIndex(courseIndex);
//   };

//   return (
//     <div style={{ width: "100%" }}>
//       {/* Header */}
//       <MyAppBar
//         position="fixed"
//         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//       >
//         <MyToolbar>
//           <MyLogo component={Link} to="/resources">
//             Reach
//           </MyLogo>
//           <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "right" }}>
//             <MyLogo>Student Dashboard</MyLogo>
//           </Typography>
//         </MyToolbar>
//       </MyAppBar>

//       {/* Content */}
//       <Container maxWidth="xl">
//         <Grid container spacing={3}>
//           {/* Enrolled Courses Section */}
//           <Grid item xs={12}>
//             <Paper
//               style={{ padding: "20px", height: "200px", overflowY: "auto" }}
//               onScroll={handleScroll}
//             >
//               <Typography variant="h6">Enrolled Courses</Typography>
//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 {enrolledCourses.map((course, index) => (
//                   <Card
//                     key={index}
//                     style={{ width: "100%", marginBottom: "20px" }}
//                   >
//                     <CardContent>
//                       <CardHeader title={course} />
//                       <Typography variant="body1">
//                         Description: Lorem ipsum dolor sit amet, consectetur
//                         adipiscing elit.
//                       </Typography>
//                       <Typography variant="body2">Progress: 50%</Typography>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleContinue(course)}
//                       >
//                         Continue
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </Paper>
//           </Grid>

//           {/* Available Courses Section */}
//           <Grid item xs={12}>
//             <Paper style={{ padding: "20px" }}>
//               <Typography variant="h6">Available Courses</Typography>
//               <Grid container spacing={3}>
//                 {/* First Row of Cards */}
//                 {availableCourses.slice(0, 3).map((course, index) => (
//                   <Grid key={index} item xs={12} sm={4}>
//                     <Card style={{ minWidth: 200, marginBottom: 20 }}>
//                       <CardContent>
//                         <Typography variant="h6">{course.name}</Typography>
//                         <Typography variant="body1">
//                           Hours: {course.hours}
//                         </Typography>
//                         <Typography variant="body1">
//                           Days: {course.days}
//                         </Typography>
//                         <Typography variant="body1">
//                           Description: {course.description}
//                         </Typography>
//                         <Typography variant="body1">
//                           Instructors: {course.instructors.join(", ")}
//                         </Typography>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           onClick={() => handleContinue(course.name)}
//                         >
//                           Enroll
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//               <Grid container spacing={3}>
//                 {/* Second Row of Cards */}
//                 {availableCourses.slice(3, 6).map((course, index) => (
//                   <Grid key={index} item xs={12} sm={4}>
//                     <Card style={{ minWidth: 200, marginBottom: 20 }}>
//                       <CardContent>
//                         <Typography variant="h6">{course.name}</Typography>
//                         <Typography variant="body1">
//                           Hours: {course.hours}
//                         </Typography>
//                         <Typography variant="body1">
//                           Days: {course.days}
//                         </Typography>
//                         <Typography variant="body1">
//                           Description: {course.description}
//                         </Typography>
//                         <Typography variant="body1">
//                           Instructors: {course.instructors.join(", ")}
//                         </Typography>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           onClick={() => handleContinue(course.name)}
//                         >
//                           Enroll
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Paper>
//           </Grid>
//           {/* Row three */}
//           <Grid item xs={12}>
//           <Paper style={{ padding: '20px' }}>
//             <Typography variant="h6">Scholarship Universities</Typography>
//             <Grid container spacing={3}>
//               {scholarshipUniversities.map((university, index) => (
//                 <Grid key={index} item xs={12} sm={4}>
//                   <Card style={{ minWidth: 200, marginBottom: 20 }}>
//                     <CardContent>
//                       <Typography variant="h6">{university.name}</Typography>
//                       <Typography variant="body1">Scholarship: {university.scholarship}</Typography>
//                       <Typography variant="body1">Start Date: {university.startDate}</Typography>
//                       <Button variant="contained" color="primary" onClick={() => handleShowDetails(university)}>Show Details</Button>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Paper>
//         </Grid>
//         </Grid>
//         <ScholarshipDetailsModal
//         open={Boolean(selectedScholarship)}
//         onClose={handleCloseDetails}
//         scholarship={selectedScholarship}
//       />
//       </Container>
//     </div>
//   );
// };

// export default StudentDashboard;
