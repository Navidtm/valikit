import * as v from 'valibot';

/**
 *
 * Password schema
 * - Allows any alphanumeric characters
 * - Length between 8 to 64 characters
 * - one lowercase and uppercase letter, one number, and one special character
 *
 * @example
 * ```ts
 * import { vk } from 'valikit';
 *
 * // Valid password
 * const validPassword = "StrongP@ssw0rd!";
 * v.parse(vk.password(), validPassword); // passes validation
 *
 * // Invalid password
 * const invalidPassword = "weakpass";
 * v.parse(vk.password(), invalidPassword); // throws validation error
 * ```
 */

const password = () => {
	const strictSchema = v.pipe(
		v.string(),
		v.minLength(8),
		v.maxLength(64),
		v.regex(/[A-Z]/),
		v.regex(/[a-z]/),
		v.regex(/[0-9]/),
		v.regex(/[!@#$%^&*(),.?":{}|<>]/),
	);

	return strictSchema;
};

export { password };
