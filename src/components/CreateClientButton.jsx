import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import PropTypes from "prop-types";
import { API_ENDPOINTS } from "../config/api";

function ClientForm({ onClientCreated }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role: "client" }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || errorData.message || "Failed to create client"
        );
      }
      setUsername("");
      setEmail("");
      setPassword("");
      setSuccess(true);
      if (onClientCreated) onClientCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-client-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Client username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Client email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Client password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="create-btn" disabled={loading}>
          {loading ? "Loading..." : "Create Client"}
        </button>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        {success && (
          <div style={{ color: "green", marginTop: 8 }}>
            Client created successfully!
          </div>
        )}
      </form>
    </div>
  );
}

ClientForm.propTypes = {
  onClientCreated: PropTypes.func,
};

function CreateClientButton({ onClientCreated }) {
  return (
    <Popover className="relative create-client-container">
      <PopoverButton className="create-btn">
        Create Client
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="15"
            fill="currentColor"
            className="bi bi-plus-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
          </svg>
        </span>
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="create-client-popup">
        <ClientForm onClientCreated={onClientCreated} />
      </PopoverPanel>
    </Popover>
  );
}

CreateClientButton.propTypes = {
  onClientCreated: PropTypes.func,
};

export default CreateClientButton;
