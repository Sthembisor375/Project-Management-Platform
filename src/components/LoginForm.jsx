// import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";
import { API_ENDPOINTS } from "../config/api";

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      console.log("🚀 Starting login process...");
      console.log("📤 Request payload:", { email, password: "***" });

      const res = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("📥 Response status:", res.status);
      console.log(
        "📥 Response headers:",
        Object.fromEntries(res.headers.entries())
      );

      const data = await res.json();
      console.log("📥 Response data:", {
        ...data,
        token: data.token ? "***" : undefined,
      });

      if (!res.ok) {
        console.error("❌ Login failed:", {
          status: res.status,
          statusText: res.statusText,
          data: data,
        });
        throw new Error(
          data.message || data.error || `Login failed with status ${res.status}`
        );
      }

      console.log("✅ Login successful!");
      login(data.token);

      // Trigger context reloads after successful login
      if (onLoginSuccess) {
        onLoginSuccess();
      }

      navigate("/home/dashboard");
    } catch (err) {
      console.error("💥 Login error:", {
        message: err.message,
        stack: err.stack,
        name: err.name,
      });

      // Handle different types of errors
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError(
          "Network error: Unable to connect to server. Please check your connection."
        );
      } else if (err.message.includes("Failed to fetch")) {
        setError("Server is not responding. Please try again later.");
      } else {
        setError(err.message || "An unexpected error occurred during login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-form">
      <h3 className="form-heading">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control padding"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control padding"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary-custom"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
      <div className="forgot-password">
        <a href="#" className="forgot-link">
          Forgot your password?
        </a>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  onLoginSuccess: PropTypes.func,
};

export default LoginForm;
