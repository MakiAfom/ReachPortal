import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";

const News: React.FC = () => {
  const [featuredArticle, setFeaturedArticle] = useState<string>(
    "https://www.unhcr.org/sites/default/files/2023-05/RF1277867_8W8A9839LowRes.jpg"
  );
  const [open, setOpen] = useState(false);

  const handleCardClick = (image: string) => {
    setFeaturedArticle(image);
  };

  // Sample news data
  const sampleNews = [
    {
      title: "Sample Song News 1",
      summary: "Short summary of Song News 1 goes here.",
      image:
        "https://www.unhcr.org/sites/default/files/2023-05/RF1277867_8W8A9839LowRes.jpg",
    },
    {
      title: "Sample Song News 2",
      summary: "Short summary of Song News 2 goes here.",
      image:
        "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/07/13/128714.jpg",
    },
    {
      title: "Sample Song News 1",
      summary: "Short summary of Song News 1 goes here.",
      image:
        "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/07/27/131498.jpg",
    },
    {
      title: "Sample Song News 2",
      summary: "Short summary of Song News 2 goes here.",
      image:
        "https://www.projecthope.org/wp-content/uploads/2023/06/0085_ETH_IDPCamp_JBuck_10_2022.jpg",
    },

    // Add more sample news as needed
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ position: "relative", minHeight: "80vh" }}>
      {/* Grid of news cards */}
      <div
        style={{
          paddingBottom: "20px",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          marginLeft: "50px",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          wrap="wrap"
          maxWidth="lg"
        >
          {sampleNews.map((news, index) => (
            <Grid key={index} item xs={12} sm={3}>
              <Card
                sx={{
                  width: "100%",
                  marginBottom: "20px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${news.image})`,
                  minHeight: "150px", // Adjust the size of the card
                }}
                onClick={() => handleCardClick(news.image)}
              >
                <CardContent style={{ paddingTop: "auto" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ color: "white" }}
                  >
                    {" "}
                    {/* Use h6 for smaller title */}
                    {news.title}
                  </Typography>
                  <Typography variant="body2" style={{ color: "white" }}>
                    {" "}
                    {/* Use body2 for smaller text */}
                    {news.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      {/* Featured article */}
      <div
        style={{
          backgroundImage: `url(${featuredArticle})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "550px",
          paddingTop: "20vh",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "20px",
            marginLeft: "30px",
            borderRadius: "20px",
            width: "400px",
            color: "white",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Title of the Featured Article
          </Typography>
          <Typography variant="body1">
            Short summary of the featured article goes here.
          </Typography>
          <Button
            onClick={handleOpen}
            style={{ color: "white", borderColor: "white", marginTop: "10px" }}
          >
            Read More
          </Button>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Title of the Featured Article</DialogTitle>
            <DialogContent dividers>
              <img
                src={featuredArticle}
                alt="Featured Article"
                style={{
                  width: "150px",
                  height: "auto",
                  objectFit: "cover",
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
              />
              <div style={{ overflowY: "auto", maxHeight: "300px" }}>
                <Typography variant="h5" gutterBottom>
                  Title of the Featured Article
                </Typography>
                <Typography variant="body1">
                  Short summary of the featured article goes here.
                </Typography>
                <Typography variant="body1">
                  Full content of the featured article goes here. (Make this
                  content long to see scrolling) Full content of the featured
                  article goes here. (Make this content long to see scrolling)
                  Full content of the featured article goes here. (Make this
                  content long to see scrolling) Full content of the featured
                  article goes here. (Make this content long to see scrolling)
                  Full content of the featured article goes here. (Make this
                  content long to see scrolling) Full content of the featured
                  article goes here. (Make this content long to see scrolling)
                  Full content of the featured article goes here. (Make this
                  content long to see scrolling) Full content of the featured
                  article goes here. (Make this content long to see scrolling)
                  Full content of the featured article goes here. (Make this
                  content long to see scrolling)
                </Typography>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      ;
    </div>
  );
};

export default News;
