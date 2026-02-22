import * as v from 'valibot';

import { DEFAULT_NICKNAME_OPTIONS } from '../../core/shared/constants.js';
import {
	nicknameRegex,
	noConsecutiveSpecialRegex,
	noDigitRegex,
	noSpacesRegex,
	unicodeRegex,
} from '../../core/shared/regexes.js';
import type { NickNameOptions } from '../../core/shared/types.js';

/**
 * A Zod schema for validating nicknames.
 * Nicknames must be 3-15 characters long and can only contain letters, numbers, and underscores.
 *
 * @example
 * // Valid nickname
 * const result = nickname.safeParse('user_123');
 * console.log(result.success); // true
 *
 * // Invalid nickname (too short)
 * const result2 = nickname.safeParse('ab');
 * console.log(result2.success); // false
 *
 * // Invalid nickname (invalid characters)
 * const result3 = nickname.safeParse('invalid-char!');
 * console.log(result3.success); // false
 *
 */
export const nickname = (options?: NickNameOptions) => {
	const { min, max } = { ...DEFAULT_NICKNAME_OPTIONS, ...options };

	const schema = v.pipe(
		v.string(),
		v.minLength(min),
		v.maxLength(max),
		v.regex(unicodeRegex),
	);

	const nicknameSchama = Object.assign(schema, {
		/**
		 * Disallows digits (0-9) in the nickname
		 */
		noDigit: () => v.pipe(nicknameSchama, v.regex(noDigitRegex)),
		/**
		 * Disallows consecutive special characters (__, --, .., _-, etc.)
		 */
		noConsecutiveSpecial: () =>
			v.pipe(nicknameSchama, v.regex(noConsecutiveSpecialRegex)),
		/**
		 * Disallows unicode letters (non-Latin scripts like Persian, Arabic, Cyrillic, etc.)
		 */
		noUnicode: () => v.pipe(nicknameSchama, v.regex(nicknameRegex)),
		/**
		 * Disallows spaces in the nickname
		 */
		noSpaces: () => v.pipe(nicknameSchama, v.regex(noSpacesRegex)),
	});

	return nicknameSchama;
};
