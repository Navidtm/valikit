import * as v from 'valibot';

/**
 * Slug schema
 * - Allows lowercase alphanumeric characters and hyphens
 * - Hyphens cannot be at the start or end, nor can they be consecutive
 * - No spaces or special characters
 *
 * @example
 * ```ts
 * import { vk } from 'valikit';
 *
 * const postSchema = v.object({
 *   slug: vk.slug(),
 * });
 *
 * // Valid slugs
 * v.parse(postSchema, { slug: 'valid-slug' }); // passes
 *
 * // Invalid slugs
 * v.parse(postSchema, { slug: 'Invalid slug' }); // throws validation error
 * ```
 */

export const slug = () => {
	const schema = v.pipe(v.string(), v.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/));

	return Object.assign(schema, {
		/**
		 *  to sanitize/normalize slug
		 *
		 * @example
		 * ```ts
		 *
		 * vk.parse(vk.slug().coerce(), '  Params '); // → 'params'
		 *
		 * ```
		 */
		coerce: () =>
			v.pipe(
				v.string(),
				v.trim(),
				v.toLowerCase(),
				v.minLength(1),
				v.transform((input) =>
					input
						.normalize('NFKD')
						.replace(/\p{Diacritic}/gu, '')
						.replace(/[^a-z0-9\s-]/gi, '')
						.replace(/\s+/g, '-')
						.replace(/--+/g, '-')
						.replace(/^-+|-+$/g, ''),
				),
				schema,
			),
	});
};
