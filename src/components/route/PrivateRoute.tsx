import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/LoginValidation";
import { LOGIN_URL } from "../../consts/PageUrls";

export function PrivateRoute(prop: { reactNode: React.ReactNode }): React.ReactNode {
    return isLoggedIn() ? prop.reactNode : <Navigate to={LOGIN_URL}/>;
}