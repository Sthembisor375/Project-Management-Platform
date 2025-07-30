import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchUsers } from "../services/fetchUsers";

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const usersData = await fetchUsers();
      // Filter to only include admin users (all non-client users)
      const adminUsers = usersData.filter(user => user.role !== 'client');
      setUsers(adminUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <UsersContext.Provider value={{ users, loading, error, reloadUsers: loadUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
} 