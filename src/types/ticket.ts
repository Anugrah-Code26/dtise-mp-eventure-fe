export interface Ticket {
  ticketId: number;
  ticketName: string;
  price: number;
  totalAvailable: number;
  description: string;
}

export interface TicketResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: Ticket[];
}
