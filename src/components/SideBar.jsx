import "../style/sideBarStyle.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePage } from "../contexts/PageContext.jsx";
import { useAuth } from "../contexts/AuthContext";

function SideBar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPage, setCurrentPage } = usePage();
  const { isClient, isAdmin } = useAuth();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const navItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      path: "/home/dashboard",
      roles: ["client", "user"], // Both clients and admins can access
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-columns-gap"
          viewBox="0 0 16 16"
        >
          <path d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" />
        </svg>
      ),
    },
    {
      key: "workload",
      label: "Workload",
      path: "/home/workload",
      roles: ["user"], // Only admins can access
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="6" width="18" height="2" rx="1" fill="white" />
          <rect x="3" y="11" width="14" height="2" rx="1" fill="white" />
          <rect x="3" y="16" width="10" height="2" rx="1" fill="white" />
        </svg>
      ),
    },
    {
      key: "tickets",
      label: "Tickets",
      path: "/home/tickets",
      roles: ["client", "user"], // Both clients and admins can access
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="7" width="18" height="10" rx="2" fill="white" />
          <rect x="7" y="11" width="10" height="2" rx="1" fill="#1a1a1a" />
        </svg>
      ),
    },
    {
      key: "clients",
      label: "Clients",
      path: "/home/clients",
      roles: ["user"], // Only admins can access
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-people-fill"
          viewBox="0 0 16 16"
        >
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
        </svg>
      ),
    },
    {
      key: "settings",
      label: "Settings",
      path: "/home/settings",
      roles: ["client", "user"], // Both clients and admins can access
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-gear-fill"
          viewBox="0 0 16 16"
        >
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
        </svg>
      ),
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => {
    if (isClient) {
      return item.roles.includes('client');
    } else if (isAdmin) {
      return item.roles.includes('user');
    }
    return false; // If user role is not determined, show no items
  });

  // Sync context with current route
  useEffect(() => {
    const found = filteredNavItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    if (found && currentPage !== found.key) {
      setCurrentPage(found.key);
    }
  }, [location.pathname]);

  const handleNav = (item) => {
    setCurrentPage(item.key);
    navigate(item.path);
  };

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <nav className="sidebar-nav">
        <ul>
          {filteredNavItems.map((item) => (
            <li
              key={item.key}
              className={currentPage === item.key ? "active" : ""}
              onClick={() => handleNav(item)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!collapsed && (
                <span className="sidebar-label">{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
    </aside>
  );
}

export default SideBar;
