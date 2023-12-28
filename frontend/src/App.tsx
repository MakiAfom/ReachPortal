import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/resources" element={<div>Resources</div>} />
        <Route path="/about" element={<div>About us</div>} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
