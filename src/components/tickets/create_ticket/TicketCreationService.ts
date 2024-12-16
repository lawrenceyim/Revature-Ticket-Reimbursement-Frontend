import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../../../errors/HttpErrors";

export async function sendTicketCreationRequest(jsonBody: string): Promise<void> {
    const loginHeaders: Headers = new Headers();
    loginHeaders.append("Content-Type", "application/json");

    const response = await fetch("http://localhost:8080/tickets/", {
        method: "POST",
        headers: loginHeaders,
        body: jsonBody
    });

    if (response.status == StatusCodes.BAD_REQUEST) {
        throw new BadRequestError("Invalid ticket details.");
    }

    if (response.status != StatusCodes.OK) {
        throw new Error("Server unavailable");
    }
}