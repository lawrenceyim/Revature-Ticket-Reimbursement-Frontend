import { useContext } from "react";
import { AccountContext, LoginContext } from "../../contexts/Contexts";
import { useNavigate } from "react-router-dom";
import './NavBar.css';
import { Account } from "../../interfaces/Account";

export function NavBar() {
    const navigate = useNavigate();
    const loginContext = useContext(LoginContext);
    const accountContext = useContext(AccountContext);
    const account = accountContext?.account;

    function logout(event: any) {
        event.preventDefault();
        accountContext.setAccount({} as Account);
        loginContext.setLogIn(false);
        navigate("/");
    }

    function WelcomeBox() {
        return (<>
            {loginContext.loggedIn ? (<>
                <p>Welcome, {account?.firstName} {account?.lastName}.</p>
                <p>Role: {account?.employeeRole}</p>
            </>) : (<>
                <p>
                    Welcome, guest.
                </p>
            </>)}
        </>);
    }

    function NavButtons() {
        return (<>
            {loginContext.loggedIn ? (<>
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