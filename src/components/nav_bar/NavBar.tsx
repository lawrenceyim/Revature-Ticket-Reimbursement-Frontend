import { useContext } from "react";
import { AccountContext, LoginContext } from "../../contexts/Contexts";
import './NavBar.css';

export function NavBar() {
    const loginContext = useContext(LoginContext);
    const accountContext = useContext(AccountContext);

    const account = accountContext?.account;

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
                <button>Logout</button>
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