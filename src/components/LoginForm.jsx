// import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5005/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      navigate("/home/dashboard");
    } catch (err) {
      setError(err.message);
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
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn btn-primary-custom">
          Login
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

export default LoginForm;
