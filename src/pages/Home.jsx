import { useState } from "react";
import SideBar from "../components/SideBar.jsx";
import TopBar from "../components/TopBar.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Dashboard from "./dashboard-sections/Dashboard";
import Workload from "./dashboard-sections/Workload";
import Tickets from "./dashboard-sections/Tickets";
import Clients from "./dashboard-sections/Clients";
import Settings from "./dashboard-sections/Settings";
import { Routes, Route } from "react-router-dom";
import "../style/Home.css";
import "../assets/search.png";

function Home() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <TopBar
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed((prev) => !prev)}
      />
      <div className={`home-layout${collapsed ? " collapsed" : ""}`}>
        <SideBar collapsed={collapsed} />
        <main className="main-content">
          <Routes>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={["client", "user"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="workload"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <Workload />
                </ProtectedRoute>
              }
            />
            <Route
              path="tickets"
              element={
                <ProtectedRoute allowedRoles={["client", "user"]}>
                  <Tickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="clients"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <Clients />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute allowedRoles={["client", "user"]}>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default Home;
