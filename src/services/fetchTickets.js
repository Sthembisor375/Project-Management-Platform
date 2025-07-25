export async function fetchTickets() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5005/api/tickets/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || "Failed to fetch tickets");
  }
  return response.json();
}

export default fetchTickets;
