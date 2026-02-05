import type { UsernameOptions } from './types.js';

export const DEFAULT_USERNAME_OPTIONS = {
	min: 3,
	max: 30,
	pattern: /^[a-z0-9_]+$/,
} as const satisfies Required<UsernameOptions>;
