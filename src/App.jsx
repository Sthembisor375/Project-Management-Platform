
import "./style/loginPageStyle.css";
import "./style/dashboardStyle.css";
import "./style/clientStyle.css";
import "./style/ticketStyle.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RequireAuth from "./contexts/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home/*" element={
        <RequireAuth>
          <Home />
        </RequireAuth>
        } />
      
    </Routes>
  );
}

export default App;
