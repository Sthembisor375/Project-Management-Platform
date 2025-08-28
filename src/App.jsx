import "./style/LoginPageStyle.css";
import "./style/DashboardStyle.css";
import "./style/ClientStyle.css";
import "./style/TicketStyle.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RequireAuth from "./contexts/RequireAuth";
import OTPConfirmPage from "./pages/OTPConfirmPage";
import EmailConfirmPage from "./pages/EmailConfirmPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/home/*"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
    // <OTPConfirmPage />
    // <EmailConfirmPage />
  );
}

export default App;
