import React, { createContext, useContext, useState } from "react";

const PageContext = createContext();

function PageProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
}

function usePage() {
  return useContext(PageContext);
} 

export {PageProvider, usePage};