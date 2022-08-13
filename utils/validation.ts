export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const PASSWORD_REGEX = /^(?=.*?[^a-z0-9]).{8,}$/i;

export const PHONE_REGEX = /^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/;

/**
 * validateEmail
 * @param email {string}
 * @author https://stackoverflow.com/a/9204568/1200341
 */
 const isValidEmail = (email: string) => EMAIL_REGEX.test(email)

 export default isValidEmail;