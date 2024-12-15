import "./ErrorMessage.css";
import { ErrorMessageProp } from "../../interfaces/Props";

export function ErrorMessage(prop: ErrorMessageProp) {
    return (<>
        {
            prop.enabled ? (<>
                <p className="error-message">{prop.message}</p>
            </>) : (<>

            </>)
        }
    </>);
}