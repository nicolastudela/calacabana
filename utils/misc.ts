import EMAIL_REGEX from "./validation";

/**
 * validateEmail
 * @param email {string}
 * @author https://stackoverflow.com/a/9204568/1200341
 */
 export const isValidEmail = (email: string) => EMAIL_REGEX.test(email)

 