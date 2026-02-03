import type { PasswordOptions } from './types.js';

export const DEFAULT_PASSWORD_OPTIONS = {
	min: 8,
	max: 64,
	minLowercase: 1,
	minUppercase: 1,
	minNumber: 1,
	minSymbol: 1,
	strength: 'strong',
} as const satisfies Required<PasswordOptions>;
