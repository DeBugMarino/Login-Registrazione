import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Private({ children }) {
  const { token } = useAuth();

  return token ? children : <Navigate to="/login" />;
}
