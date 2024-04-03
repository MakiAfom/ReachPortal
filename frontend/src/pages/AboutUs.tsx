import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import reach from  "../assets/reach.svg";

const AboutUs = () => {
  return (
    <div className="bg-blue-500 py-12">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center mt-100">Empowering Refugees Through Communication and Education: A Holistic Approach</h2>
        <Grid container spacing={4}>
          {/* Introduction Card */}
          <Grid item xs={12}>
            <Card className="rounded-lg shadow-md border border-blue-500 bg-white">
              <CardContent className="p-4">
                <Typography variant="h5" component="h3" align="center" gutterBottom>Introduction</Typography>
                <Typography variant="body1">
                  In today's interconnected world, refugees face numerous challenges when it comes to communication, accessing education, and navigating their new surroundings. As they seek to rebuild their lives in unfamiliar territories, it is imperative to provide them with the necessary tools and support to communicate effectively, access educational resources, and integrate into their new communities. This essay explores the importance of empowering refugees through tailored communication assistance, flexible education opportunities, and access to essential information.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Communication Support Card */}
          <Grid item xs={12} sm={6}>
            <Card className="rounded-lg shadow-md border border-blue-500 bg-white">
              <CardContent className="p-4">
                <div className="flex justify-center mb-4">
                  <Avatar alt="Communication Image" src="https://www.unhcr.org/sites/default/files/legacy-images/4e27d2026.jpg" sx={{ width: 100, height: 100 }} />
                </div>
                <Typography variant="h5" component="h3" align="center" gutterBottom>Communication Support</Typography>
                <Typography variant="body1">
                  Effective communication is essential for refugees to navigate their new environment, access services, and connect with others. However, language barriers often pose significant challenges. To address this, our agency provides language interpretation and translation services, enabling refugees to communicate with skilled workers, access essential services, and advocate for their needs. By bridging the language gap, we empower refugees to participate fully in their new communities and access opportunities for employment and education.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Education Opportunities Card */}
          <Grid item xs={12} sm={6}>
            <Card className="rounded-lg shadow-md border border-blue-500 bg-white">
              <CardContent className="p-4">
                <div className="flex justify-center mb-4">
                  <Avatar alt="Education Image" src="https://www.worldbank.org/content/dam/photos/780x439/2021/feb-3/REFUGEECapture.JPG" sx={{ width: 100, height: 100 }} />
                </div>
                <Typography variant="h5" component="h3" align="center" gutterBottom>Education Opportunities</Typography>
                <Typography variant="body1">
                  Education is a fundamental human right and a key pathway to empowerment for refugees. However, traditional educational systems may not always be accessible or suitable for their unique needs. Our agency recognizes the importance of flexible education opportunities that accommodate refugees' diverse backgrounds, experiences, and learning styles. Through partnerships with educational institutions, community organizations, and online platforms, we offer a range of learning options, including language classes, vocational training, and digital literacy programs. By tailoring education to refugees' individual needs and allowing them to learn at their own pace, we empower them to acquire new skills, pursue their aspirations, and rebuild their lives with confidence.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Access to Information Card */}
          <Grid item xs={12}>
            <Card className="rounded-lg shadow-md border border-blue-500 bg-white">
              <CardContent className="p-4">
                <div className="flex justify-center mb-4">
                  <Avatar alt="Information Image" src="https://borgenproject.org/wp-content/uploads/Refugees_in_Djibouti-530x371.jpg" sx={{ width: 100, height: 100 }} />
                </div>
                <Typography variant="h5" component="h3" align="center" gutterBottom>Access to Information</Typography>
                <Typography variant="body1">
                  Access to accurate and timely information is essential for refugees to make informed decisions, navigate their surroundings, and stay connected with global events. However, limited access to technology, language barriers, and information overload can hinder their ability to access essential information. Our agency addresses this challenge by providing refugees with access to digital devices, internet connectivity, and user-friendly information portals. Through partnerships with local libraries, community centers, and media outlets, we also facilitate access to relevant news, resources, and support services. By empowering refugees with the knowledge and resources they need to stay informed and engaged, we enable them to participate fully in society and advocate for their rights.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className="flex justify-center mb-4">
                  <Avatar alt="Introduction Image" src={reach} sx={{ width: 200, height: 200 }} />
                </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;