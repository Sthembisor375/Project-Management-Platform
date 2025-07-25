import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import fetchTickets from "../services/fetchTickets";

const TicketsContext = createContext();

export function TicketsProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTickets();
      setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  return (
    <TicketsContext.Provider value={{ tickets, loading, error, reloadTickets: loadTickets }}>
      {children}
    </TicketsContext.Provider>
  );
}

export function useTickets() {
  return useContext(TicketsContext);
} 