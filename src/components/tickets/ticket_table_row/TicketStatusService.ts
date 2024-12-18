import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../../../errors/HttpErrors";
import { TicketStatus } from "../../../enums/TicketStatus";
import { Ticket } from "../../../interfaces/Ticket";

export async function approveTicketRequest(ticket: Ticket): Promise<void> {
    const requestHeaders: Headers = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    ticket.status = TicketStatus.APPROVED;

    const response = await fetch("http://localhost:8080/tickets/", {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(ticket)
    });

    if (response.status == StatusCodes.BAD_REQUEST) {
        throw new BadRequestError("Unable to change ticket status.")
    }

    if (response.status != StatusCodes.OK) {
        throw new Error("Server unavailable");
    }
}

export async function denyTicketRequest(ticket: Ticket): Promise<void> {
    const requestHeaders: Headers = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    ticket.status = TicketStatus.DENIED;

    const response = await fetch("http://localhost:8080/tickets/", {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(ticket)
    });

    if (response.status == StatusCodes.BAD_REQUEST) {
        throw new BadRequestError("Unable to change ticket status.")
    }

    if (response.status != StatusCodes.OK) {
        throw new Error("Server unavailable");
    }
}