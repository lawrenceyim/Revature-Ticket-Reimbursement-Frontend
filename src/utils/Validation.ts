import { MAX_FIRST_NAME_LENGTH, MAX_LAST_NAME_LENGTH, MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "../api_data/ApiConsts";

export function isFirstNameValid(firstName: string): boolean {
    return firstName.length > 0 && firstName.length <= MAX_FIRST_NAME_LENGTH;
}

export function isLastNameValid(lastName: string): boolean {
    return lastName.length > 0 && lastName.length <= MAX_LAST_NAME_LENGTH;
}

export function isPasswordValid(password: string): boolean {
    return password.length >= MIN_PASSWORD_LENGTH && password.length <= MAX_PASSWORD_LENGTH;
}

export function isUsernameValid(username: string): boolean {
    return username.length >= MIN_USERNAME_LENGTH && username.length <= MAX_USERNAME_LENGTH;
}

