export const symbolRegex = '[!@#$%^&*(),.?":{}|<>]';
export const nicknameRegex = /^[a-zA-Z0-9_ .-]+$/;
export const usernameRegex = /^[a-z0-9_]+$/;
export const noDigitRegex = /^\D*$/;
export const noConsecutiveSpecialRegex = /^(?!.*([_.-])\1)/;
export const unicodeRegex = /^[\p{L}\p{M}\p{N}_ .-]+$/u;
export const noSpacesRegex = /^\S$/;
