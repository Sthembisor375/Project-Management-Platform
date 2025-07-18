import { useState } from "react";
import SideBar from "../components/Sidebar";
import TopBar from "../components/TopBar";
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
            <Route path="/home/dashboard" element={<Dashboard />} />
            <Route path="/home/workload" element={<Workload />} />
            <Route path="/home/tickets" element={<Tickets />} />
            <Route path="/home/clients" element={<Clients />} />
            <Route path="/home/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default Home;
