import CreateTicketButton from "../../components/CreateTicketButton";
import TicketCounters from "../../components/TicketCounters";
import { useTickets } from "../../contexts/TicketsContext";
import { useEffect } from "react";

function Workload() {
  const { reloadTickets } = useTickets();

  useEffect(() => {
    reloadTickets();
  }, [reloadTickets]);

  return (
    <div>
      <h2>Workload</h2>
      <CreateTicketButton onTicketCreated={reloadTickets} />
      <TicketCounters />
    </div>
  );
}

export default Workload;
