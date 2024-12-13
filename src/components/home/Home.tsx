import { useContext } from "react";
import { LoginForm } from "../login_form/LoginForm";
import { LogInContext } from "../../App";

export function Home() {
    const loginProp = useContext(LogInContext)

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