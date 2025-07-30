import { API_ENDPOINTS } from "../config/api";

export async function fetchTickets() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(API_ENDPOINTS.TICKETS.BASE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.message || "Failed to fetch tickets"
      );
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
}

export default fetchTickets;
