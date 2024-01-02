import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

export default App;
