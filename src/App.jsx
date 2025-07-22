import "./App.css";
import "./style/LoginPageStyle.css";
import "./style/DashboardStyle.css";
import "./style/ClientStyle.css";
import "./style/TicketStyle.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<LoginPage />} />
    //   <Route path="/signup" element={<SignupPage />} />
    // </Routes>
    <Home />
  );
}

export default App;
