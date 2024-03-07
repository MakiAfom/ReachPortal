import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"
import ResourceDashboard from "../components/resources/UserDashboard"


function Resources() {
  return (
    <div>
    <Navbar />
    <div style={{ marginTop: '1px', padding: '5px' }}> {/* Adjust the margin top to accommodate the height of the Navbar */}
      <ResourceDashboard />
      
      <Footer />
    </div>
  </div>
  )
}

export default Resources