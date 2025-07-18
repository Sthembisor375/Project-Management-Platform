import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-page">
        <div className="welcome-section">
          <h3>Welcome</h3>
          <p>Your all-in-one space to plan, collaborate, and stay on track.</p>
          <p>Log in or create an account to get started.</p>
          <div className="signup-section">
            <p>Don't have an account?</p>
            <button className="btn btn-signup" onClick={() => navigate("/")}>Login</button>
          </div>
        </div>
        <div className="form-section">
          <SignupForm />
        </div>
      </div>
    </>
  );
}

export default SignupPage;
