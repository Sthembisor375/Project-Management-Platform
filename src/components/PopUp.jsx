import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useClients } from "../contexts/ClientsContext";
import "../style/popupStyle.css";

export default function PopUp({ onClose, children, ticket, reloadTickets }) {
  const [form, setForm] = useState({
    title: ticket?.title || "",
    description: ticket?.description || "",
    status: ticket?.status || "",
    client: ticket?.client || "",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { isClient, isAdmin } = useAuth();
  const { clients, loading: clientsLoading } = useClients();

  // Debug logging for role detection
  console.log('PopUp - AuthContext values:', { isClient, isAdmin });

  // Status transition logic
  const getAvailableStatusOptions = (currentStatus, userRole) => {
    // Admin users can change to any status
    if (userRole === 'admin') {
      return ['backlog', 'in_progress', 'client_review', 'revisions', 'complete'];
    }
    
    // Client users can only update status when ticket is in client_review
    if (userRole === 'client' && currentStatus === 'client_review') {
      return ['complete', 'revisions'];
    }
    
    // Client users cannot update status in other states
    return [];
  };

  const availableStatusOptions = getAvailableStatusOptions(ticket.status, isClient ? 'client' : 'admin');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Send all form data to backend, but frontend restrictions prevent client users from editing other fields
      const updateData = form;
      
      // Debug logging
      console.log('User role - isClient:', isClient, 'isAdmin:', isAdmin);
      console.log('Form data:', form);
      console.log('Update data being sent:', updateData);
      console.log('Ticket ID:', ticket._id);
      
      const response = await fetch(
        `http://localhost:5005/api/tickets/${ticket._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        throw new Error(
          errorData.error || errorData.message || "Failed to update ticket"
        );
      }
      console.log('Update successful');
      setEditMode(false);
      if (reloadTickets) reloadTickets();
      onClose();
    } catch (err) {
      console.error("Error updating ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    // Client users cannot delete tickets
    if (isClient) {
      alert("You don't have permission to delete tickets.");
      return;
    }
    
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5005/api/tickets/${ticket._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || errorData.message || "Failed to delete ticket"
        );
      }
      onClose();
      if (reloadTickets) reloadTickets();
    } catch (err) {
      console.error("Error deleting ticket:", err);
    }
  };

  return (
    <div className="overlayStyle">
      <div className="popupStyle">
        <button className="closeBtnStyle" onClick={onClose}>
          X
        </button>
        {ticket ? (
          !editMode ? (
            <div className="ticketContentStyle">
              <h2 style={{ marginBottom: "24px", textAlign: "center" }}>
                Ticket Details
              </h2>
              <div className="fieldStyle">
                <label className="labelStyle">Title:</label>
                <div className="valueStyle">{form.title}</div>
              </div>
              <div className="fieldStyle">
                <label className="labelStyle">Description:</label>
                <div className="valueStyle">{form.description}</div>
              </div>
              <div className="fieldStyle">
                <label className="labelStyle">Status:</label>
                <div className="valueStyle">
                  {form.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              </div>
              <div className="fieldStyle">
                <label className="labelStyle">Client:</label>
                <div className="valueStyle">
                  {typeof form.client === "object"
                    ? form.client?.name ||
                      form.client?.username ||
                      form.client?.email ||
                      form.client?._id
                    : form.client}
                </div>
              </div>
              <div className="ticket-buttons">
                <button
                  type="button"
                  className="update-ticket-btn"
                  onClick={() => setEditMode(true)}
                >
                  {isClient ? "Update Status" : "Update"}
                </button>
                {!isClient && (
                <button
                  type="button"
                  className="delete-ticket-btn"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                )}
              </div>
            </div>
          ) : (
            <form className="ticketContentStyle" onSubmit={handleSubmit}>
              <h2 style={{ marginBottom: "24px", textAlign: "center" }}>
                {isClient ? "Update Ticket Status" : "Edit Ticket"}
              </h2>
              <div className="fieldStyle">
                <label className="labelStyle">Title:</label>
                {isClient ? (
                  <div className="valueStyle" style={{ width: "100%", padding: "8px", backgroundColor: "#2a2a2a", border: "1px solid #444", borderRadius: "4px" }}>
                    {form.title}
                  </div>
                ) : (
                <input
                  className="valueStyle"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  required
                />
                )}
              </div>
              <div className="fieldStyle">
                <label className="labelStyle">Description:</label>
                {isClient ? (
                  <div className="valueStyle" style={{ width: "100%", minHeight: 60, padding: "8px", backgroundColor: "#2a2a2a", border: "1px solid #444", borderRadius: "4px" }}>
                    {form.description}
                  </div>
                ) : (
                <textarea
                  className="valueStyle"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  style={{ width: "100%", minHeight: 60 }}
                  required
                />
                )}
              </div>
              <div className="fieldStyle">
                <label className="labelStyle">Status:</label>
                {/* For client users, show read-only status unless in client_review */}
                {isClient && ticket.status !== 'client_review' ? (
                  <div className="valueStyle">
                    {form.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                ) : (
                <select
                  className="valueStyle"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  required
                >
                  {/* Show current status as first option */}
                  <option value={form.status}>
                    {form.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} (Current)
                  </option>
                  {/* Show available transitions */}
                  {availableStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
                )}
                {availableStatusOptions.length === 0 && (
                  <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '4px' }}>
                    {isClient && ticket.status !== 'client_review' 
                      ? 'Client can only update status when ticket is in Client Review' 
                      : 'No status transitions available from current status'
                    }
                  </div>
                )}
              </div>
              <div className="fieldStyle">
                <label className="labelStyle">Client:</label>
                {isClient ? (
                  <div className="valueStyle" style={{ width: "100%", padding: "8px", backgroundColor: "#2a2a2a", border: "1px solid #444", borderRadius: "4px" }}>
                    {typeof form.client === "object"
                      ? form.client?.name ||
                        form.client?.username ||
                        form.client?.email ||
                        form.client?._id
                      : form.client}
                  </div>
                ) : (
                <select
                  className="valueStyle"
                  name="client"
                  value={
                    typeof form.client === "object"
                      ? form.client?.username
                      : form.client
                  }
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  required
                >
                  {clientsLoading ? (
                    <option value="">Loading clients...</option>
                  ) : clients.length === 0 ? (
                    <option value="">No clients found.</option>
                  ) : (
                    <>
                      <option value="">Select a client</option>
                      {clients.map((client) => (
                        <option key={client._id} value={client.username}>
                          {client.name || client.username || client.email}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                )}
              </div>
              <div className="ticket-buttons">
                <button
                  type="submit"
                  className="update-ticket-btn"
                  disabled={loading}
                >
                  {loading ? "Loading..." : (isClient ? "Update Status" : "Save Changes")}
                </button>
                <button
                  type="button"
                  className="update-ticket-btn"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )
        ) : (
          children || (
            <div style={{ textAlign: "center" }}>
              <h2>Sample PopUp</h2>
              <p>This is a sample popup component.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
