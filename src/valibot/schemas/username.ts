import * as v from 'valibot';

/**
 * Username schema
 * - Allows lowercase alphanumeric characters and underscores
 * - Length between 3 to 30 characters
 * - No spaces or special characters
 *
 * @example
 * ```ts
 * import * as v from 'valibot';
 * import { vk } from 'valikit';
 *
 * const userSchema = v.object({
 *   username: vk.username(),
 * });
 *
 * // Valid usernames
 * v.parse(userSchema, { username: 'valid_username' }); // passes
 * v.parse(userSchema, { username: 'anotherValid123' }); // passes
 *
 * // Invalid usernames
 * v.parse(userSchema, { username: 'Invalid-Username' }); // throws error (uppercase letters and hyphen)
 * v.parse(userSchema, { username: 'invalid username' }); // throws error (spaces)
 * v.parse(userSchema, { username: 'in' }); // throws error (too short)
 * v.parse(userSchema, { username: 'this_username_is_way_too_long_to_be_valid' }); // throws error (too long)
 * ```
 */
const username = () => {
	// Strict schema: only valid usernames pass
	const strictSchema = v.pipe(v.string(), v.regex(/^[a-z0-9_]{3,30}$/));

	return Object.assign(strictSchema, {
		/**
		 * Coerce username
		 *
		 * @example
		 * ```ts
		 * v.parse(vk.username().coerce(), '  User Name !@#  ')  // → 'user_name'
		 *
		 * ```
		 */
		coerce: () =>
			v.pipe(
				v.string(),
				v.trim(),
				v.toLowerCase(),
				v.transform((val) => val.replace(/[^a-z0-9_\s]/g, '').trim()), // remove any remaining invalid chars
				v.transform((val) => val.replace(/\s+/g, '_')), // replace spaces with underscore
				v.regex(/^[a-z0-9_]{3,30}$/),
			),
	});
};

export { username };
