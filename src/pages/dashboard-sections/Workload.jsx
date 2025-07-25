import CreateButton from "../../components/CreateButton";
import TicketCounters from "../../components/TicketCounters";
import { useTickets } from "../../contexts/TicketsContext";
import { useEffect } from "react";

function Workload() {

  return (
    <div>
      <h2>Workload</h2>
      <CreateButton />
      <TicketCounters />
    </div>
  );
}

export default Workload;
