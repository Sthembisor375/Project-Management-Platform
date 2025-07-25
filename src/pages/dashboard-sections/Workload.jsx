import CreateButton from "../../components/CreateButton";
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
      <CreateButton onTicketCreated={reloadTickets} />
      <TicketCounters />
    </div>
  );
}

export default Workload;
