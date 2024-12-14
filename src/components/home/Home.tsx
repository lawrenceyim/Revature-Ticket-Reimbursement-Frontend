import { LoginForm } from "../login_form/LoginForm";
import { LOGGED_IN } from "../../consts/SessionStorageKeys";

export function Home() {
    return (<>
        {sessionStorage.getItem(LOGGED_IN) ? (
            <>Helloworld</>
        ) : (
            <LoginForm />
        )}
    </>);
}