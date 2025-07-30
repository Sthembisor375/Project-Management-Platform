import CreateClientButton from "../../components/CreateClientButton";
import { useClients } from "../../contexts/ClientsContext";
import Loader from "../../components/Loader";
import "../../style/clientStyle.css";

function ClientCards() {
  const { clients, loading, error } = useClients();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="client-error">{error}</div>;
  }

  if (!clients || clients.length === 0) {
    return <div className="client-empty">No clients found</div>;
  }

  return (
    <div className="client-cards-container">
      {clients.map((client) => (
        <div key={client._id} className="client-card">
          <span className="client-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </span>
          <p className="client-name">{client.username}</p>
        </div>
      ))}
    </div>
  );
}

function Clients() {
  const { reloadClients } = useClients();

  return (
    <div>
      <h2>Clients</h2>
      <CreateClientButton onClientCreated={reloadClients} />
      <ClientCards />
    </div>
  );
}

export default Clients;
