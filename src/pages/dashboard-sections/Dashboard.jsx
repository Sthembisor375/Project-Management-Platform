import CreateTicketButton from "../../components/CreateTicketButton";
import Loader from "../../components/Loader";
import { useTickets } from "../../contexts/TicketsContext";
import { useState } from "react";
import PopUp from "../../components/PopUp";
import "../../style/DashboardStyle.css";
import TicketCounters from "../../components/TicketCounters";

function Dashboard() {
  const { tickets, loading, error, reloadTickets } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setSelectedTicket(null);
  };

  // Filter tickets by selected status if set
  const filteredTickets = selectedStatus
    ? tickets.filter((ticket) => ticket.status === selectedStatus)
    : tickets;

  return (
    <div>
      <h2>Dashboard</h2>
      <CreateTicketButton onTicketCreated={reloadTickets} />
      <TicketCounters
        tickets={tickets}
        selectedStatus={selectedStatus}
        onStatusSelect={setSelectedStatus}
      />
      <h3>Tickets</h3>
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
                <col style={{ width: "30%" }} />
                <col style={{ width: "30%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Client Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket, idx) => (
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
                  </tr>
                ))}
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

export default Dashboard;
