export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const PASSWORD_REGEX = /^(?=.*?[^a-z0-9]).{8,}$/i;

export const PHONE_REGEX = /^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/;

export default EMAIL_REGEX;
