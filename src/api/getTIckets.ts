import { TicketResponse } from "@/types/ticket";

const getTickets = async (eventId: number): Promise<TicketResponse> => {
  const response = await fetch(
    `http://localhost:8080/api/v1/event/${eventId}/ticket`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return response.json();
};

export { getTickets };
