import * as z from 'zod';

/**
 * Username schema
 * - Allows lowercase alphanumeric characters and underscores
 * - Length between 3 to 30 characters
 * - No spaces or special characters
 *
 * @example
 * ```ts
 * import * as z from 'zod';
 * import { zk } from 'valikit';
 *
 * const userSchema = z.object({
 *   username: zk.username(),
 * });
 *
 * // Valid usernames
 * userSchema.parse({ username: 'valid_username' }); // passes
 * userSchema.parse({ username: 'anotherValid123' }); // passes
 *
 * // Invalid usernames
 * userSchema.parse({ username: 'Invalid-Username' }); // throws error (uppercase letters and hyphen)
 * userSchema.parse({ username: 'invalid username' }); // throws error (spaces)
 * userSchema.parse({ username: 'in' }); // throws error (too short)
 * userSchema.parse({ username: 'this_username_is_way_too_long_to_be_valid' }); // throws error (too long)
 *
 * ```
 */

const username = () => {
	// Strict schema: only valid usernames pass
	const strictSchema = z.string().regex(/^[a-z0-9_]{3,30}$/);

	// Return schema with chainable .sanitize() method
	return Object.assign(strictSchema, {
		/**
		 * Coerce username
		 *
		 * @example
		 * ```ts
		 *
		 * zk.username().coerce().parse('  User Name !@#  '); // → 'user_name'
		 *
		 * ```
		 */
		coerce: () =>
			z
				.string()
				.trim()
				.toLowerCase()
				.transform((val) => val.replace(/[^a-z0-9_\s]/g, '').trim()) // remove any remaining invalid chars
				.transform((val) => val.replace(/\s+/g, '_')) // replace spaces with underscore
				.pipe(strictSchema), // final strict validation (length + regex)
	});
};

export { username };
