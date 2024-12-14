import './NavBar.css';
import { useNavigate } from "react-router-dom";
import { Account } from "../../interfaces/Account";
import { capitalizeFirstLetterOnly } from '../../utils/Capitalization';
import { LOGGED_IN, USER_ACCOUNT } from '../../consts/SessionStorageKeys';
import { LOGIN_URL } from '../../consts/PageUrls';

export function NavBar() {
    const navigate = useNavigate();

    function logout(event: any) {
        event.preventDefault();
        sessionStorage.removeItem(USER_ACCOUNT);
        sessionStorage.removeItem(LOGGED_IN);
        navigate(LOGIN_URL);
    }

    function WelcomeBox() {
        const accountJson: string | null = sessionStorage.getItem(USER_ACCOUNT);
        if (!sessionStorage.getItem(LOGGED_IN) || accountJson == null) {
            return (<>
                <p>Welcome, guest.</p>
            </>);
        }

        const account: Account = JSON.parse(accountJson);
        console.log(account);
        return (<>
            <p>Welcome, {account.firstName} {account.lastName}.</p>
            <p>Role: {capitalizeFirstLetterOnly(account?.employeeRole as string)}</p>
        </>);
    }

    function NavButtons() {
        return (<>
            {sessionStorage.getItem(LOGGED_IN) ? (<>
                <button onClick={logout}>Logout</button>
            </>) : (<>

            </>)}
        </>);
    }

    return (<>
        <div className="navbar flex-container">
            <div className="welcome-box flex-item">
                <WelcomeBox />
            </div>
            <div className="nav-buttons flex-item">
                <NavButtons />
            </div>
        </div>
    </>);
}