import { LOGGED_IN } from "../consts/SessionStorageKeys";

export function isLoggedIn(): boolean {
    const loginJson: string| null = sessionStorage.getItem(LOGGED_IN);
    if (loginJson == null || loginJson != JSON.stringify(true)) {
        return false;
    }
    return true;
}