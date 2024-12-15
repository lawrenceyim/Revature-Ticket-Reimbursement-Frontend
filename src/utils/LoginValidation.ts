import { LOGGED_IN } from "../consts/SessionStorageKeys";

export function isLoggedIn(): boolean {
    const loginJson: string| null = localStorage.getItem(LOGGED_IN);
    if (loginJson == null || (loginJson as string) != JSON.stringify(true)) {
        return false;
    }
    return true;
}