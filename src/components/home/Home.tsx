import { createContext, useContext } from "react";
import { LoginForm } from "../login_form/LoginForm";
import { LoggedInContext } from "../../App";

export function Home() {
    const loginProp = useContext(LoggedInContext)

    return (
        <>
            {loginProp.loggedIn ? (
                <>Helloworld</>
            ) : (
                <LoginForm />
            )}
        </>
    );
}