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

const slug = () => z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);

export { slug };
