// import AdminDashboard from "../components/admin/Admin"


// import CommunityForum from "../components/communityForum/CommunityForum"
import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"
import DashboardVolunteer from "../components/volunteer/DashboardVolunteer"





function AboutUs() {
  return (
  <>
      <Navbar />
      <div style={{ display: 'flex', marginTop: '64px' }}>
     
        {/* <AdminDashboard /> */}
        <DashboardVolunteer />
        {/* <CommunityForum /> */}

      </div>
      <Footer />
     
</>
  )
}

export default AboutUs