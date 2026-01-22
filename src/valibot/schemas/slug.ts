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

const slug = () => v.pipe(v.string(), v.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/));

export { slug };
