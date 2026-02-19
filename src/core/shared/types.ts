export type UsernameOptions = {
	/** Minimum length of the username
	 * @default 3
	 */
	min: number;
	/** Maximum length of the username
	 * @default 30
	 */
	max: number;
	/** Regular expression pattern that the username must match
	 * @default /^[a-zA-Z0-9_]+$/
	 */
	pattern: RegExp;
};

export interface ReservedUsernameOptions {
	/** Additional base words to block (merged with defaults) */
	extra?: string[];
	/** Allow underscores + content after (e.g. admin_team)
	 * @default false
	 */
	allowUnderscoreSuffix?: boolean;
	/** Minimum length of numeric suffix to block (1 = block admin1, admin01, etc.)
	 * @default 0
	 */
	minNumericSuffixLength?: number;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export type PasswordOptions = Partial<{
	/**
	 * Minimum length of the password.
	 * @default 8
	 */
	min: number;
	/**
	 * Maximum length of the password.
	 * @default 64
	 */
	max: number;
	/**
	 * Minimum number of lowercase letters required.
	 * @default 1
	 */
	minLowercase: number;
	/**
	 * Minimum number of uppercase letters required.
	 * @default 1
	 */
	minUppercase: number;
	/**
	 * Minimum number of digits required.
	 * @default 1
	 */
	minNumber: number;
	/**
	 * Minimum number of symbols required.
	 * @default 1
	 */
	minSymbol: number;
}>;
