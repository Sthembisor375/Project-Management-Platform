import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { isTokenExpired } from "../utils/auth";
import { useTickets } from "./TicketsContext";
import { useClients } from "./ClientsContext";
import { useUsers } from "./UsersContext";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const { reloadTickets } = useTickets();
  const { reloadClients } = useClients();
  const { reloadUsers } = useUsers();

  useEffect(() => {
    // Trigger context reloads when user is authenticated
    if (token && !isTokenExpired(token)) {
      reloadTickets();
      reloadClients();
      reloadUsers();
    }
  }, [token, reloadTickets, reloadClients, reloadUsers]);

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
  return children;
}
