import { useContext } from "react";
import { LoginForm } from "../login_form/LoginForm";
import { LoginContext } from "../../contexts/Contexts";

export function Home() {
    const loginContext = useContext(LoginContext)

    return (<>
        {loginContext.loggedIn ? (
            <>Helloworld</>
        ) : (
            <LoginForm />
        )}
    </>);
}