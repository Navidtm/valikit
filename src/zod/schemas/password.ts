import * as z from 'zod';

/**
 *
 * Password schema
 * - Allows any alphanumeric characters
 * - Length between 8 to 64 characters
 * - one lowercase and uppercase letter, one number, and one special character
 *
 * @example
 * ```ts
 * import { zk } from 'valikit';
 *
 * // Valid password
 * const validPassword = "StrongP@ssw0rd!";
 * password.parse(validPassword); // passes validation
 *
 * // Invalid password
 * const invalidPassword = "weakpass";
 * password.parse(invalidPassword); // throws validation error
 * ```
 */

const password = () => {
	const strictSchema = z
		.string()
		.min(8)
		.max(64)
		.regex(/[A-Z]/)
		.regex(/[a-z]/)
		.regex(/[0-9]/)
		.regex(/[!@#$%^&*(),.?":{}|<>]/);

	return strictSchema;
};

export { password };
