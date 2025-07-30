import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import PropTypes from "prop-types";
import { useClients } from "../contexts/ClientsContext";
import { useUsers } from "../contexts/UsersContext";
import { API_ENDPOINTS } from "../config/api";

function TicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("backlog");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { clients, loading: clientsLoading } = useClients();
  const { users, loading: usersLoading } = useUsers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_ENDPOINTS.TICKETS.BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          status,
          client,
          assignedTo,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || errorData.message || "Failed to create ticket"
        );
      }
      setTitle("");
      setDescription("");
      setStatus("backlog");
      setClient("");
      setAssignedTo("");
      setSuccess(true);
      if (onTicketCreated) onTicketCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-ticket-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ticket description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="backlog">Backlog</option>
            <option value="in_progress">In Progress</option>
            <option value="revisions">Revisions</option>
            <option value="client_review">Client Review</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <div className="form-group">
          <label>Client</label>
          <select
            className="form-control"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
            disabled={clientsLoading}
          >
            <option value="">Select a client</option>
            {clientsLoading ? (
              <option value="" disabled>
                Loading clients...
              </option>
            ) : (
              clients.map((client) => (
                <option key={client._id} value={client.username}>
                  {client.username}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Assigned To</label>
          <select
            className="form-control"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            disabled={usersLoading}
          >
            <option value="">Select a user</option>
            {usersLoading ? (
              <option value="" disabled>
                Loading admins...
              </option>
            ) : (
              users.map((user) => (
                <option key={user._id} value={user.username}>
                  {user.username}
                </option>
              ))
            )}
          </select>
        </div>
        <button type="submit" className="create-btn" disabled={loading}>
          {loading ? "Loading..." : "Create Ticket"}
        </button>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        {success && (
          <div style={{ color: "green", marginTop: 8 }}>Ticket created!</div>
        )}
      </form>
    </div>
  );
}

TicketForm.propTypes = {
  onTicketCreated: PropTypes.func,
};

function CreateTicketButton({ onTicketCreated }) {
  return (
    <Popover className="relative create-ticket-container">
      <PopoverButton className="create-btn">
        Create Ticket
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
      <PopoverPanel anchor="bottom" className="create-ticket-popup">
        <TicketForm onTicketCreated={onTicketCreated} />
      </PopoverPanel>
    </Popover>
  );
}

CreateTicketButton.propTypes = {
  onTicketCreated: PropTypes.func,
};

export default CreateTicketButton;
