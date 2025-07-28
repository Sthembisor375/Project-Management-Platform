import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useTickets } from "../contexts/TicketsContext";
import { useClients } from "../contexts/ClientsContext";

function LoginPage() {
  const navigate = useNavigate();
  const { reloadTickets } = useTickets();
  const { reloadClients } = useClients();

  const handleLoginSuccess = () => {
    // Trigger reload of all contexts after successful login
    reloadTickets();
    reloadClients();
  };

  return (
    <>
      <div className="login-page">
        <div className="welcome-section">
          <h3>Welcome</h3>
          <p>Your all-in-one space to plan, collaborate, and stay on track.</p>
          <p>Log in or create an account to get started.</p>
          <div className="signup-section">
            <p>Don't have an account?</p>
            <button
              className="btn btn-signup"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="form-section">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
