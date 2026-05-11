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

export interface NickNameOptions {
	/**
	 * Minimum length of the nickname.
	 * @default 3
	 */
	min?: number;
	/**
	 * Maximum length of the nickname.
	 * @default 30
	 */
	max?: number;
	/**
	 * Nickname regex pattern
	 * @default /^[a-zA-Z0-9_.-]+$/
	 */
	regex?: RegExp;
}

export interface AgeOptions {
	/**
	 * Minimum allowed age.
	 * @default 0
	 */
	min?: number;
	/**
	 * Maximum allowed age (logical human age).
	 * @default 150
	 */
	max?: number;
}

export interface BirthDateOptions {
	/**
	 * Minimum age in years. The birth date must be at least this many years ago.
	 */
	minAge?: number;
	/**
	 * Maximum age in years. The birth date must be no more than this many years ago.
	 */
	maxAge?: number;
	/**
	 * Optional death date to calculate age at the time of death instead of current age. If provided, the birth date must be at least `minAge` years before the death date and no more than `maxAge` years before the death date.
	 * Note: If `deathDate` is provided, the age will be calculated based on the difference between the birth date and the death date instead of the current date.
	 * This allows for validating historical birth dates or calculating age at the time of death.
	 * The `deathDate` must be a valid Date object and must be after the birth date.
	 */
	deathDate?: Date | string | number;
}
