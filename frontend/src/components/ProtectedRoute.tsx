import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  if (!user.token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
