import { useEffect, useState } from "react";
import { useTickets } from "../../contexts/TicketsContext";
import PopUp from "../../components/PopUp";
import CreateTicketButton from "../../components/CreateTicketButton";
import "../../style/ticketStyle.css";

function Tickets() {
  const { tickets, loading, error, reloadTickets } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  useEffect(() => {
    reloadTickets();
  }, [reloadTickets]);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setSelectedTicket(null);
  };

  const statusColumns = [
    { key: "backlog", label: "Backlog" },
    { key: "in_progress", label: "In Progress" },
    { key: "revisions", label: "Revisions" },
    { key: "client_review", label: "Client Review" },
    { key: "complete", label: "Complete" },
  ];

  return (
    <div>
      <h2>Tickets</h2>
      <CreateTicketButton onTicketCreated={reloadTickets} />
      {loading ? (
        <div>Loading tickets...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className="ticket-columns">
          {statusColumns.map((col) => (
            <div className="column" key={col.key}>
              <h4>{col.label}</h4>
              {tickets.filter((ticket) => ticket.status === col.key).length ===
              0 ? (
                <div className="no-tickets">No tickets</div>
              ) : (
                tickets
                  .filter((ticket) => ticket.status === col.key)
                  .map((ticket) => (
                    <div
                      key={ticket._id}
                      className="ticket-card"
                      onClick={() => handleTicketClick(ticket)}
                    >
                      <div className="ticket-title">{ticket.title}</div>
                      <div className="ticket-description">
                        {ticket.description}
                      </div>
                      <div className="ticket-client">{ticket.client}</div>
                    </div>
                  ))
              )}
            </div>
          ))}
        </div>
      )}
      {isPopUpOpen && (
        <PopUp
          onClose={closePopUp}
          ticket={selectedTicket}
          reloadTickets={reloadTickets}
        />
      )}
    </div>
  );
}

export default Tickets;
