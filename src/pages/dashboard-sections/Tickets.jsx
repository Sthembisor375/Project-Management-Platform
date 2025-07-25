import { useEffect } from "react";
import { useTickets } from "../../contexts/TicketsContext";
import CreateButton from "../../components/CreateButton";

function Tickets() {
  const { tickets, loading, error, reloadTickets } = useTickets();

  useEffect(() => {
    reloadTickets();
  }, [reloadTickets]);

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
      <CreateButton />
      {loading ? (
        <div>Loading tickets...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className="ticket-columns">
          {statusColumns.map(col => (
            <div className="column" key={col.key}>
              <h4>{col.label}</h4>
              {tickets.filter(ticket => ticket.status === col.key).length === 0 ? (
                <div style={{ color: '#aaa' }}>No tickets</div>
              ) : (
                tickets
                  .filter(ticket => ticket.status === col.key)
                  .map(ticket => (
                    <div key={ticket._id} style={{ marginBottom: 8, background: '#232323', borderRadius: 4, padding: 6 }}>
                      <strong>{ticket.title}</strong>
                      <div style={{ fontSize: '0.9em', color: '#ccc' }}>{ticket.description}</div>
                    </div>
                  ))
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tickets;
