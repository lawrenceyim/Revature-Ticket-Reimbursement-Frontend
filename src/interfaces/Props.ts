import { Ticket } from "./Ticket";

export interface ErrorMessageProp {
  enabled: boolean;
  message: string;
}

export interface TicketRowProp {
    ticket: Ticket;
    callback: () => void;
}