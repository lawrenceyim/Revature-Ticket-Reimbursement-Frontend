export function capitalizeFirstLetterOnly(input: string) {
    if (!input) {
        return input;
    }
    return input.charAt(0).toUpperCase() + input.substring(1).toLowerCase();
}