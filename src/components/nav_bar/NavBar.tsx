import './NavBar.css';
import { useNavigate } from "react-router-dom";
import { Account } from "../../interfaces/Account";
import { capitalizeFirstLetterOfEachWord, capitalizeFirstLetterOnly, replaceUnderscoreWithSpace } from '../../utils/StringFormat';
import { LOGGED_IN, USER_ACCOUNT } from '../../consts/SessionStorageKeys';
import { LOGIN_URL, MENU_URL } from '../../consts/PageUrls';
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

    function goToMenu(event: any) {
        event.preventDefault();
        navigate(MENU_URL);
    }

    function WelcomeBox() {
        const account: Account = getAccount() as Account;

        if (!isLoggedIn()) {
            return (<>
                <p>Welcome, guest.</p>
            </>);
        }

        return (<>
            <p>Welcome, {account.firstName} {account.lastName}.</p>
            <p>Role: {capitalizeFirstLetterOfEachWord(replaceUnderscoreWithSpace(account?.employeeRole as string))}</p>
        </>);
    }

    function NavButtons() {
        return (<>
            {sessionStorage.getItem(LOGGED_IN) ? <button onClick={goToMenu}>Menu</button> : <></>}
            {sessionStorage.getItem(LOGGED_IN) ? <button onClick={logout}>Logout</button> : <></>}
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