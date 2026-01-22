import * as z from 'zod';

/**
 *
 * Password schema
 * - Allows any alphanumeric characters
 * - Length between 8 to 64 characters
 * - one lowercase and uppercase letter, one number, and one special character
 */

const password = () => {
	const strictSchema = z
		.string()
		.min(8)
		.max(64)
		.regex(/[A-Z]/)
		.regex(/[a-z]/)
		.regex(/[0-9]/)
		.regex(/[!@#$%^&*(),.?":{}|<>]/);

	return strictSchema;
};

export { password };
