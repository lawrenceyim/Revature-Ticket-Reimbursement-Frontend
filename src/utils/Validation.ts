import { MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "../api_data/ApiConsts";

export function isUsernameValid(username: string) {
    return username.length >= MIN_USERNAME_LENGTH && username.length <= MAX_USERNAME_LENGTH;
}

export function isPasswordValid(password: string) {
    return password.length >= MIN_PASSWORD_LENGTH && password.length <= MAX_PASSWORD_LENGTH;
}