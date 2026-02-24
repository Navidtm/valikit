import * as z from 'zod';

import { DEFAULT_AGE_OPTIONS } from '../../core/shared/constants.js';
import type { AgeOptions } from '../../core/shared/types.js';

/**
 * Zod schema for validating age.
 *
 * Age must be an integer and within the specified range.
 * All shortcuts are chainable and return an independent schema.
 *
 * @example
 * ```ts
 * zk.age().parse(25);                    // valid
 * zk.age(18).parse(20);                  // Minimum 18 years
 * zk.age().adult().parse(25);            // Adult
 * zk.age().teen().parse(16);             // Teenager
 * zk.age({ min: 13, max: 80 }).parse(30);
 * ```
 */
export const age = (options?: AgeOptions) => {
	const { min, max } = { ...DEFAULT_AGE_OPTIONS, ...options };

	const baseSchema = z.number().int().nonnegative();

	const schema = baseSchema.gte(min).lte(max);

	const ageSchema = Object.assign(schema, {
		/**
		 * Accepts string input and automatically converts it to a number
		 * @example zk.age().coerce().parse("25")
		 */
		coerce: () =>
			z.unknown().transform(Number).transform(Math.floor).pipe(ageSchema),
		/**
		 * Child (0 to 12 years)
		 */
		child: () => baseSchema.lte(12),
		/**
		 * Preteen (9 to 12 years)
		 */
		preTeen: () => baseSchema.gte(9).lte(12),
		/**
		 * Teenager (13 to 19 years)
		 */
		teen: () => baseSchema.gte(13).lte(19),
		/**
		 * Minor (less than 18 years)
		 */
		minor: () => baseSchema.lt(18),
		/**
		 * Young Adult (18 to 25 years)
		 */
		youngAdult: () => baseSchema.gte(18).lte(25),
		/**
		 * Adult (18 years or older)
		 */
		adult: () => baseSchema.gte(18),
		/**
		 * Senior (60 years or older)
		 */
		senior: () => baseSchema.gte(60),
		/**
		 * Elderly (75 years or older)
		 */
		elderly: () => baseSchema.gte(75),
	});

	return ageSchema;
};

age().coerce();
