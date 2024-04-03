import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./store";
// import ProtectedRoute from "./components/ProtectedRoute";
import useAuthState from "./store/useAuthState";
import  Home  from "../src/pages/Home";
import Resources from "./pages/Resources";
import AboutUs from "./pages/AboutUs";

import StudenDashboardInteract from "../src/components/student/StudentDashboardIteract"
import StudentDashboard from "../src/components/student/StudentDashboard";
import CommunityForm from "./components/communityForum/CommunityForum";
import Admin from "./pages/Admin";
import DashBoardVolunteer from "./pages/DashBoardVolunteer";


function App() {
  const user = useAppSelector((state) => state.auth.user);
  useAuthState(user);

  return (
    <Routes>
      <Route
        path="/"
        element={
          // <ProtectedRoute>
            <Home />
          /* </ProtectedRoute> */
        }
      />
      <Route path="/resources" element={<Resources />} />
      <Route path="/AdminDashboard" element={<Admin />} />
      <Route path="/VolunteerDashboard" element={<DashBoardVolunteer />} />
      <Route path="/StudentDashEnrollement" element={<StudentDashboard/>} />
      <Route path="/StudentDashboardInteract" element={<StudenDashboardInteract />} />
      <Route path="/CommunityForum" element={<CommunityForm />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

export default App;
