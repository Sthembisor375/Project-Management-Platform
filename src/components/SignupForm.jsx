import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function confirmPasswordMatch() {
    return password === confirmPassword;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Client-side validation
    if (!confirmPasswordMatch()) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");
    setLoading(true);

    const role = "user";

    try {
      console.log("🚀 Starting signup process...");
      console.log("📤 Request payload:", { username, email, password: "***" });

      const res = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      console.log("📥 Response status:", res.status);
      console.log(
        "📥 Response headers:",
        Object.fromEntries(res.headers.entries())
      );

      const data = await res.json();
      console.log("📥 Response data:", data);

      if (!res.ok) {
        console.error("❌ Signup failed:", {
          status: res.status,
          statusText: res.statusText,
          data: data,
        });
        throw new Error(
          data.message ||
            data.error ||
            `Signup failed with status ${res.status}`
        );
      }

      console.log("✅ Signup successful!");
      navigate("/");
    } catch (err) {
      console.error("💥 Signup error:", {
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
        setError(err.message || "An unexpected error occurred during signup");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-form">
      <h3 className="form-heading">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control padding"
            id="signupUsername"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control padding"
            id="signupEmail"
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
            id="signupPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control padding"
            id="signupConfirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary-custom"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
