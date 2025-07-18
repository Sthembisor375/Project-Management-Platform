import { useState } from "react";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!confirmPasswordMatch()) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // Handle signup logic here
  }

  function confirmPasswordMatch() {
    return password === confirmPassword;
  }

  return (
    <div className="login-form">
      <h3 className="form-heading">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control padding"
            id="signupEmail"
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
            id="signupPassword"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control padding"
            id="signupConfirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn btn-primary-custom">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
