import { RESERVED_USERNAMES } from '../consts/reserved-usernames.js';
import type { ReservedUsernameOptions } from '../shared/types.js';

/**
 * Creates a RegExp that matches reserved usernames and common variations.
 * Variations include:
 * - Exact match (case-insensitive)
 * - With numeric suffix: admin1, root123, support99
 * - With underscore suffix: admin_team, root_user (configurable)
 *
 * @param options - Customization options
 * @returns RegExp that returns true if the username is reserved/forbidden
 */
export function createReservedUsername(
	options: ReservedUsernameOptions = {},
): RegExp {
	const {
		extra = [],
		allowUnderscoreSuffix = false,
		minNumericSuffixLength = 1,
	} = options;

	// Combine default and custom data, remove duplicates
	const allReserved = [...new Set([...RESERVED_USERNAMES, ...extra])];

	if (allReserved.length === 0) {
		// Empty regex that never matches
		return /$^/;
	}

	// Escape special regex characters in each base word
	const escaped = allReserved.map((word) =>
		word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
	);

	const basePattern = escaped.join('|');

	// Build the pattern parts
	let pattern = `^(${basePattern})`;

	// Optional numeric suffix (e.g. admin123, root7)
	if (minNumericSuffixLength > 0) {
		pattern += `(?:\\d{${minNumericSuffixLength},})?`;
	}

	// Optional underscore + alphanumeric suffix (configurable)
	if (!allowUnderscoreSuffix) {
		pattern += `(?:_[a-z0-9]+)?`;
	}

	pattern += `$`;

	// Case-insensitive
	return new RegExp(pattern, 'i');
}
