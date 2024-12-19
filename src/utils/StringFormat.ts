export function capitalizeFirstLetterOnly(input: string) {
    if (!input) {
        return input;
    }
    return input.charAt(0).toUpperCase() + input.substring(1).toLowerCase();
}

export function capitalizeFirstLetterOfEachWord(input: string) {
    if (!input) {
        return input;
    }
    return input.split(" ")
        .map(word => capitalizeFirstLetterOnly(word))
        .join(" ")
        .trim();
}

export function replaceUnderscoreWithSpace(input: string) {
    if (!input) {
        return input;
    }
    return input.replace(/_/g, " ");
}