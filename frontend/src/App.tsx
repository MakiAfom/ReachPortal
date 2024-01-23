import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./store";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthState from "./store/useAuthState";

function App() {
  const user = useAppSelector((state) => state.auth.user);
  useAuthState(user);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div>Home</div>
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

export default App;
