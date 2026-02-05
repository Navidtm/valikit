export type UsernameOptions = {
	min: number;
	max: number;
	pattern: RegExp;
};

export interface ReservedUsernameOptions {
	/** Additional base words to block (merged with defaults) */
	extra?: string[];
	/** Allow underscores + content after (e.g. admin_team) → default: false (block) */
	allowUnderscoreSuffix?: boolean;
	/** Minimum length of numeric suffix to block (1 = block admin1, admin01, etc.) */
	minNumericSuffixLength?: number;
}
