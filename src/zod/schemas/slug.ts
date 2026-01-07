import * as z from 'zod';

/**
 * Slug schema
 * - Allows lowercase alphanumeric characters and hyphens
 * - Hyphens cannot be at the start or end, nor can they be consecutive
 * - Case insensitive
 * - No spaces or special characters
 * - Transforms to lowercase and trims whitespace
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
 * postSchema.parse({ slug: 'another-valid-slug-123' }); // passes
 *
 * // Invalid slugs
 * postSchema.parse({ slug: 'Invalid-Slug' }); // throws error (uppercase letters)
 * postSchema.parse({ slug: 'invalid_slug' }); // throws error (underscores)
 * postSchema.parse({ slug: 'invalid slug' }); // throws error (spaces)
 * postSchema.parse({ slug: '-leading-hyphen' }); // throws error (leading hyphen)
 * ```
 */

const slug = () => z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);

export { slug };
