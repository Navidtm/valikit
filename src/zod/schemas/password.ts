import * as z from 'zod';

import { symbolRegex } from '../../core/shared/regexes.js';
import { COMMON_PASSWORDS } from '../../core/validators/password/common-password.js';
import { DEFAULT_PASSWORD_OPTIONS } from '../../core/validators/password/constants.js';
import type {
	PasswordOptions,
	PasswordStrength,
} from '../../core/validators/password/types.js';

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

export const password = (options?: PasswordOptions) => {
	const { min, max, minLowercase, minNumber, minSymbol, minUppercase } = {
		...DEFAULT_PASSWORD_OPTIONS,
		...options,
	};

	const baseSchema = z.string().max(max).min(min);

	const schema = baseSchema
		.regex(new RegExp(`[a-z]{${minLowercase},}`))
		.regex(new RegExp(`[0-9]{${minNumber},}`))
		.regex(new RegExp(`[A-Z]{${minUppercase},}`))
		.regex(new RegExp(`${symbolRegex}{${minSymbol},}`));

	return Object.assign(schema, {
		noSpaces: () => schema.regex(/^\S+$/),
		noCommon: () =>
			schema.refine((val) => !COMMON_PASSWORDS.has(val.toLowerCase())),
		strength: (strength: PasswordStrength) => {
			switch (strength) {
				case 'weak':
					return baseSchema;
				case 'medium':
					return baseSchema
						.regex(new RegExp(`[a-z]{${minLowercase},}`))
						.regex(new RegExp(`[0-9]{${minNumber},}`));
				case 'strong':
					return baseSchema
						.regex(new RegExp(`[a-z]{${minLowercase},}`))
						.regex(new RegExp(`[0-9]{${minNumber},}`))
						.regex(new RegExp(`[A-Z]{${minUppercase},}`))
						.regex(new RegExp(`${symbolRegex}{${minSymbol},}`));
			}
		},
	});
};
