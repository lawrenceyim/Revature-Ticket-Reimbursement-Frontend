import { Navigate } from "react-router-dom";
import { MENU_URL } from "../../consts/PageUrls";
import { isLoggedIn } from "../../utils/LoginValidation";

export function UnathenticatedRoute(prop: { reactNode: React.ReactNode }): React.ReactNode {
    return isLoggedIn() ? <Navigate to={MENU_URL} /> : prop.reactNode;
}