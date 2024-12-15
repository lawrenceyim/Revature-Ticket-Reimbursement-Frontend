import "./TicketCreation.css";
import { useRef, useState } from "react";
import { MAX_TICKET_DESCRIPTION_LENGTH } from "../../../consts/ApiConsts";
import { ReimbursementType } from "../../../enums/ReimbursementType";
import { NavBar } from "../../nav_bar/NavBar";

export function TicketCreation() {
    const [amount, setAmount] = useState<number>(0);
    const reimbursementTypeRef = useRef<ReimbursementType>(ReimbursementType.FOOD);
    const descriptionRef = useRef<string>("");


    function validateAmount(event: any) {
        let inputAmount: number = event.target.value;
        inputAmount = Math.floor(inputAmount * 100) / 100;
        setAmount(inputAmount);
    }

    async function submitTicket(event: any) {
        event.preventDefault();

        console.log(reimbursementTypeRef.current);
        console.log(amount);
        console.log(descriptionRef.current);
    }

    return (<>
        <NavBar/>
        <form onSubmit={submitTicket}>
            <fieldset className="ticket-creation-form">
                <legend>Reimbursement Ticket Form</legend>

                <label htmlFor="reimbursement-type">Reimbursement Type</label>
                <select
                    name="reimbursement-type"
                    id="reimbursement-type"
                    onChange={e => reimbursementTypeRef.current = e.target.value as ReimbursementType}>
                    {Object.values(ReimbursementType).map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <label>Reimbursement Amount</label>
                <input
                    id="reimbursement-amount"
                    type="number"
                    min={0}
                    step="0.01"
                    value={amount}
                    onInput={validateAmount} />

                <label>Reimbursement Description</label>
                <textarea
                    placeholder="description"
                    minLength={1}
                    maxLength={MAX_TICKET_DESCRIPTION_LENGTH}
                    onChange={e => descriptionRef.current = e.target.value} />

                <button type="submit">Submit</button>
                <button>Return to Menu</button>
            </fieldset>
        </form>
    </>);
}