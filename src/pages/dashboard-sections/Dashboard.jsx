import CreateButton from "../../components/CreateButton";
import { useTickets } from "../../contexts/TicketsContext";

function Dashboard() {
  const { tickets, loading, error, reloadTickets } = useTickets();

  return (
    <div>
      <h2>Dashboard</h2>
      <CreateButton onTicketCreated={reloadTickets} />
      <h3>Tickets</h3>
      <div className="table-container">
        {loading ? (
          <div>Loading tickets...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">Client Name</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, idx) => (
                <tr key={ticket._id || idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{ticket.title}</td>
                  <td>{ticket.status}</td>
                  <td>{
                    typeof ticket.client === "object"
                      ? ticket.client?.name || ticket.client?.username || ticket.client?.email || ticket.client?._id
                      : ticket.client
                  }</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
