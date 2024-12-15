import './NavBar.css';
import { useNavigate } from "react-router-dom";
import { Account } from "../../interfaces/Account";
import { capitalizeFirstLetterOnly } from '../../utils/Capitalization';
import { LOGGED_IN, USER_ACCOUNT } from '../../consts/SessionStorageKeys';
import { LOGIN_URL } from '../../consts/PageUrls';
import { isLoggedIn } from '../../utils/LoginValidation';
import { getAccount } from '../../utils/SessionStorageUtils';

export function NavBar() {
    const navigate = useNavigate();

    function logout(event: any) {
        event.preventDefault();
        sessionStorage.removeItem(USER_ACCOUNT);
        sessionStorage.removeItem(LOGGED_IN);
        navigate(LOGIN_URL);
    }

    function WelcomeBox() {
        const account: Account = getAccount();

        if (!isLoggedIn()) {
            return (<>
                <p>Welcome, guest.</p>
            </>);
        }

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
        <div className="navbar">
            <div className="welcome-box">
                <WelcomeBox />
            </div>
            <div>
                <NavButtons />
            </div>
        </div>
    </>);
}