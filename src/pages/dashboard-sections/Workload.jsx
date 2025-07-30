import CreateTicketButton from "../../components/CreateTicketButton";
import TicketCounters from "../../components/TicketCounters";
import { useTickets } from "../../contexts/TicketsContext";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import PopUp from "../../components/PopUp";
import "../../style/dashboardStyle.css";

function Workload() {
  const { reloadTickets, tickets, loading, error } = useTickets();
  const { username } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  useEffect(() => {
    reloadTickets();
  }, [reloadTickets]);

  // Filter tickets to show only those assigned to the current user
  const assignedTickets = tickets.filter(
    (ticket) => ticket.assignedTo === username
  );

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div>
      <h2>Workload</h2>
      <CreateTicketButton onTicketCreated={reloadTickets} />
      <TicketCounters tickets={assignedTickets} />
      <h3>My Assigned Tickets</h3>
      <div className="table-container">
        {loading ? (
          <Loader />
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <>
            <table className="table table-striped table-dark dashboard-ticket-table">
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {assignedTickets.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      No tickets assigned to you
                    </td>
                  </tr>
                ) : (
                  assignedTickets.map((ticket, idx) => (
                    <tr
                      key={ticket._id || idx}
                      className="dashboard-ticket-row"
                      onClick={() => handleTicketClick(ticket)}
                      style={{ cursor: "pointer" }}
                    >
                      <th scope="row">{idx + 1}</th>
                      <td>{ticket.title}</td>
                      <td>{ticket.status}</td>
                      <td>
                        {typeof ticket.client === "object"
                          ? ticket.client?.name ||
                            ticket.client?.username ||
                            ticket.client?.email ||
                            ticket.client?._id
                          : ticket.client}
                      </td>
                      <td>{ticket.assignedTo || "Not assigned"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {isPopUpOpen && (
              <PopUp
                onClose={closePopUp}
                ticket={selectedTicket}
                reloadTickets={reloadTickets}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Workload;
