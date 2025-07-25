import React from "react";
import "../style/popupStyle.css";

export default function PopUp({ onClose, children, ticket }) {
  return (
    <div className="overlayStyle">
      <div className="popupStyle">
        <button className="closeBtnStyle" onClick={onClose}>X</button>
        {ticket ? (
          <div className="ticketContentStyle">
            <h2 style={{ marginBottom: "24px", textAlign: "center" }}>Ticket Details</h2>
            <div className="fieldStyle">
              <span className="labelStyle">Title:</span>
              <div className="valueStyle">{ticket.title}</div>
            </div>
            <div className="fieldStyle">
              <span className="labelStyle">Description:</span>
              <div className="valueStyle">{ticket.description}</div>
            </div>
            <div className="fieldStyle">
              <span className="labelStyle">Status:</span>
              <div className="valueStyle">{ticket.status}</div>
            </div>
            <div className="fieldStyle">
              <span className="labelStyle">Client:</span>
              <div className="valueStyle">
                {typeof ticket.client === "object"
                  ? ticket.client?.name || ticket.client?.username || ticket.client?.email || ticket.client?._id
                  : ticket.client || "No client assigned"}
              </div>
            </div>
          </div>
        ) : (
          children || <div style={{ textAlign: "center" }}><h2>Sample PopUp</h2><p>This is a sample popup component.</p></div>
        )}
      </div>
    </div>
  );
} 