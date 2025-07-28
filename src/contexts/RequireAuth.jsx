import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { isTokenExpired } from "../utils/auth";
import { useTickets } from "./TicketsContext";
import { useClients } from "./ClientsContext";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const { reloadTickets } = useTickets();
  const { reloadClients } = useClients();

  useEffect(() => {
    // Trigger context reloads when user is authenticated
    if (token && !isTokenExpired(token)) {
      reloadTickets();
      reloadClients();
    }
  }, [token, reloadTickets, reloadClients]);

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
  return children;
}
