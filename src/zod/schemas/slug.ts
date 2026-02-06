import * as z from 'zod';

/**
 * Slug schema
 * - Allows lowercase alphanumeric characters and hyphens
 * - Hyphens cannot be at the start or end, nor can they be consecutive
 * - No spaces or special characters
 *
 * @example
 * ```ts
 * import { zk } from 'valikit';
 *
 * const postSchema = z.object({
 *   slug: zk.slug(),
 * });
 *
 * // Valid slugs
 * postSchema.parse({ slug: 'valid-slug' }); // passes
 *
 * // Invalid slugs
 * postSchema.parse({ slug: 'Invalid-Slug' }); // throws validation error
 * ```
 */

export const slug = () => {
	const schema = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);

	return Object.assign(schema, {
		/**
		 *  to sanitize/normalize slug
		 *
		 * @example
		 * ```ts
		 *
		 * zk.slug().coerce().parse('  Params '); // → 'params'
		 *
		 * ```
		 */
		coerce: () =>
			z
				.string()
				.trim()
				.toLowerCase()
				.min(1)
				.transform((v) =>
					v
						.normalize('NFKD')
						.replace(/\p{Diacritic}/gu, '')
						.replace(/[^a-z0-9\s-]/gi, '')
						.replace(/\s+/g, '-')
						.replace(/--+/g, '-')
						.replace(/^-+|-+$/g, ''),
				)
				.pipe(schema),
	});
};
