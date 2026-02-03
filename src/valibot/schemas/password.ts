import * as v from 'valibot';

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

export const password = (options?: PasswordOptions) => {
	const { min, max, minLowercase, minNumber, minSymbol, minUppercase } = {
		...DEFAULT_PASSWORD_OPTIONS,
		...options,
	};

	const baseSchema = v.pipe(v.string(), v.maxLength(max), v.minLength(min));

	const schema = v.pipe(
		baseSchema,
		v.regex(new RegExp(`[a-z]{${minLowercase},}`)),
		v.regex(new RegExp(`[0-9]{${minNumber},}`)),
		v.regex(new RegExp(`[A-Z]{${minUppercase},}`)),
		v.regex(new RegExp(`${symbolRegex}{${minSymbol},}`)),
	);

	return Object.assign(schema, {
		noSpaces: () => v.pipe(schema, v.regex(/^\S+$/)),
		noCommon: () =>
			v.pipe(
				schema,
				v.check((val) => !COMMON_PASSWORDS.has(val.toLowerCase())),
			),
		strength: (strength: PasswordStrength) => {
			switch (strength) {
				case 'weak':
					return v.pipe(baseSchema);
				case 'medium':
					return v.pipe(
						baseSchema,
						v.regex(new RegExp(`[a-z]{${minLowercase},}`)),
						v.regex(new RegExp(`[0-9]{${minNumber},}`)),
					);
				case 'strong':
					return v.pipe(
						baseSchema,
						v.regex(new RegExp(`[a-z]{${minLowercase},}`)),
						v.regex(new RegExp(`[0-9]{${minNumber},}`)),
						v.regex(new RegExp(`[A-Z]{${minUppercase},}`)),
						v.regex(new RegExp(`${symbolRegex}{${minSymbol},}`)),
					);
			}
		},
	});
};
