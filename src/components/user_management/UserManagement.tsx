import { useEffect, useState } from "react";
import { Account } from "../../interfaces/Account";
import { NavBar } from "../nav_bar/NavBar";
import { AccountTableRow } from "./account_table_row/AccountTableRow";
import { findAllAccountsRequest } from "./AccountService";

export function UserManagement() {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        changeAccountsShown();
    }, []);

    async function changeAccountsShown() {
        setAccounts([]);

        try {
            const receivedAccounts: Account[] = await findAllAccountsRequest();
            setAccounts(receivedAccounts);
        } catch (error: any){

        }
    }

    function Notification(): JSX.Element {
        // if (serverUnavailable) {
        //     return <p className="notification" style={{ color: "red" }}>Server unavailable.</p>
        // }
        // if (fetching) {
        //     return <p className="notification" style={{ color: "blue" }}>Fetching ticket data from server.</p>
        // }
        return <></>;
    }

    return <>
        <NavBar />
        <table className="user-viewer">
            <thead>
                <tr key="table-headers">
                    <th>Account ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {accounts.map(account => <AccountTableRow key={account.accountId} account={account} callback={changeAccountsShown} />)}
            </tbody>
        </table>
        <Notification/>
    </>;
}