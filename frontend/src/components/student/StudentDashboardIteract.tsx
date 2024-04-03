import React, { useState } from "react";
import {
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  CssBaseline,
  Container,
  Grid,
  Paper,
  TextareaAutosize,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import LinkIcon from "@mui/icons-material/Link";
import ProgressIcon from "@mui/icons-material/Equalizer";
import NoteIcon from "@mui/icons-material/Note";
import { MyAppBar, MyLogo, MyToolbar } from "../../utils/StyledComps";
import { Link } from "react-router-dom";

interface Subtopic {
  id: string;
  title: string;
  content: string;
}

interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

interface CourseMaterial {
  id: string;
  title: string;
  topics: Topic[];
}

const drawerWidth = 240;

// Sample data for the course materials
const courseMaterials: CourseMaterial[] = [
  {
    id: "1",
    title: "Introduction to Programming",
    topics: [
      {
        id: "1",
        title: "Fundamentals of Programming",
        subtopics: [
          {
            id: "1",
            title: "Variables and Data Types",
            content: "Each tool type has its particular purpose: A hammer to drive a nail into wood, a paint brush to paint, and a wrench tightens or loosens nuts and bolts. The same goes for the variables we use to hold data in our code. Regardless of the programming language you use, when building a website or app you will want to use the appropriate type of variable for a particular purpose. We will look at basic types and more complex types such as arrays (lists) and objects You can also watch the associated video here which walks through the key variable data types.",
          },
          {
            id: "2",
            title: "Control Structures",
            content:
              "This is about control structures like if statements and loops.",
          },
        ],
      },
      {
        id: "2",
        title: "Functions and Methods",
        subtopics: [
          {
            id: "3",
            title: "Introduction to Functions",
            content: "This is the introduction to functions and methods.",
          },
          {
            id: "4",
            title: "Function Parameters and Return Values",
            content: "This is about function parameters and return values.",
          },
        ],
      },
    ],
  },
];

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(
    null
  );
  // State and functions for notes
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null); // Reset selected subtopic when a new topic is selected
  };

  const handleSubtopicClick = (subtopic: Subtopic) => {
    setSelectedSubtopic(subtopic);
    setSelectedTopic(null); // Reset selected topic when a subtopic is selected
  };
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <MyAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <MyToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: 2 , color: "#0070f4"}}
          >
            <MenuIcon />
          </IconButton>
          <Typography>
            <MyLogo component={Link} to="/resources">
              Reach
            </MyLogo>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, textAlign: "right" }}
          >
            <MyLogo>Student Dashboard</MyLogo>
          </Typography>
        </MyToolbar>
      </MyAppBar>
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": { width: drawerWidth, marginTop: "60px" },
        }}
      >
        <div style={{ width: drawerWidth, marginTop: "80px" }}>
          <List>
            {courseMaterials.map((course) => (
              <React.Fragment key={course.id}>
                <ListItem>
                  <ListItemText primary={course.title} />
                </ListItem>
                {course.topics.map((topic) => (
                  <React.Fragment key={topic.id}>
                    <ListItem onClick={() => handleTopicClick(topic)}>
                      <ListItemText primary={topic.title} />
                    </ListItem>
                    {selectedTopic === topic && (
                      <List>
                        {topic.subtopics.map((subtopic) => (
                          <ListItem
                            key={subtopic.id}
                            onClick={() => handleSubtopicClick(subtopic)}
                            style={{ color: "blue", paddingLeft: "50px" }}
                          >
                            <ListItemText primary={subtopic.title} />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Chat with AI" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary="External Links" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ProgressIcon />
              </ListItemIcon>
              <ListItemText primary="View Progress" />
            </ListItem>
            <ListItem button onClick={() => setShowNotes(!showNotes)}>
              <ListItemIcon>
                <NoteIcon />
              </ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItem>
            {/* Display previously written notes */}
            {showNotes &&
              notes.map((note, index) => (
                <ListItem key={index}>
                  <ListItemText primary={note} />
                </ListItem>
              ))}
          </List>
        </div>
      </Drawer>

      <main style={{ flexGrow: 1, padding: 100 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              {/* Main content */}
              <Paper
                style={{
                  maxHeight: "80vh",
                  overflowY: "auto",
                  width: "1300px",
                }}
              >
                <Typography variant="h5">
                  {selectedSubtopic
                    ? selectedSubtopic.title
                    : selectedTopic
                    ? selectedTopic.title
                    : "Course"}
                </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedSubtopic
                      ? selectedSubtopic.content
                      : selectedTopic
                      ? selectedTopic.subtopics
                          .map(
                            (subtopic) =>
                              `<p>${subtopic.title}: ${subtopic.content}</p>`
                          )
                          .join("")
                      : "",
                  }}
                />
                {/* Note text area and button */}
                {showNotes && (
                  <>
                    <TextareaAutosize
                      aria-label="empty textarea"
                      placeholder="Write your note here..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      style={{
                        width: "500px",
                        height: "200px",
                        marginBottom: "10px",
                      }}
                    />
                    <Button variant="contained" onClick={handleAddNote}>
                      Save Note
                    </Button>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
