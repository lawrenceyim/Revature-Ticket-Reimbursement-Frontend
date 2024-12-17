import { StatusCodes } from "http-status-codes";
import { TicketProp } from "../../../interfaces/Props";
import { BadRequestError } from "../../../errors/HttpErrors";
import { TicketStatus } from "../../../enums/TicketStatus";

export async function approveTicketRequest(ticket: TicketProp): Promise<void> {
    const ticketHeaders: Headers = new Headers();
    ticketHeaders.append("Content-Type", "application/json");

    ticket.ticket.status = TicketStatus.APPROVED;

    const response = await fetch("http://localhost:8080/tickets/", {
        method: "PATCH",
        headers: ticketHeaders,
        body: JSON.stringify(ticket.ticket)
    });

    if (response.status == StatusCodes.BAD_REQUEST) {
        throw new BadRequestError("Unable to change ticket status.")
    }

    if (response.status != StatusCodes.OK) {
        throw new Error("Server unavailable");
    }
}

export async function denyTicketRequest(ticket: TicketProp): Promise<void> {
    const ticketHeaders: Headers = new Headers();
    ticketHeaders.append("Content-Type", "application/json");

    ticket.ticket.status = TicketStatus.DENIED;

    const response = await fetch("http://localhost:8080/tickets/", {
        method: "PATCH",
        headers: ticketHeaders,
        body: JSON.stringify(ticket.ticket)
    });

    if (response.status == StatusCodes.BAD_REQUEST) {
        throw new BadRequestError("Unable to change ticket status.")
    }

    if (response.status != StatusCodes.OK) {
        throw new Error("Server unavailable");
    }
}