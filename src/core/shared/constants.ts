import type {
	PasswordOptions,
	ReservedUsernameOptions,
	UsernameOptions,
} from './types.js';

export const DEFAULT_RESERVED_REGEXES: Required<ReservedUsernameOptions> = {
	extra: [],
	minNumericSuffixLength: 1,
	allowUnderscoreSuffix: false,
} as const;

export const DEFAULT_USERNAME_OPTIONS: Required<UsernameOptions> = {
	min: 3,
	max: 30,
	pattern: /^[a-z0-9_]+$/,
} as const;

export const DEFAULT_PASSWORD_OPTIONS: Required<PasswordOptions> = {
	min: 8,
	max: 64,
	minLowercase: 1,
	minUppercase: 1,
	minNumber: 1,
	minSymbol: 1,
} as const;
