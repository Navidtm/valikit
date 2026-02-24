import * as v from 'valibot';

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

	const baseSchema = v.pipe(v.number(), v.integer(), v.minValue(0));

	const schema = v.pipe(baseSchema, v.minValue(min), v.maxValue(max));

	const ageSchema = Object.assign(schema, {
		/**
		 * Accepts string input and automatically converts it to a number
		 * @example zk.age().coerce().parse("25")
		 */
		coerce: () =>
			v.pipe(
				v.unknown(),
				v.transform(Number),
				v.transform(Math.floor),
				ageSchema,
			),
		/**
		 * Child (0 to 12 years)
		 */
		child: () => v.pipe(baseSchema, v.maxValue(12)),
		/**
		 * Preteen (9 to 12 years)
		 */
		preTeen: () => v.pipe(baseSchema, v.minValue(9), v.maxValue(12)),
		/**
		 * Teenager (13 to 19 years)
		 */
		teen: () => v.pipe(baseSchema, v.minValue(13), v.maxValue(19)),
		/**
		 * Minor (less than 18 years)
		 */
		minor: () => v.pipe(baseSchema, v.maxValue(17)),
		/**
		 * Young Adult (18 to 25 years)
		 */
		youngAdult: () => v.pipe(baseSchema, v.minValue(18), v.maxValue(25)),
		/**
		 * Adult (18 years or older)
		 */
		adult: () => v.pipe(baseSchema, v.minValue(18)),
		/**
		 * Senior (60 years or older)
		 */
		senior: () => v.pipe(baseSchema, v.minValue(60)),
		/**
		 * Elderly (75 years or older)
		 */
		elderly: () => v.pipe(baseSchema, v.minValue(75)),
	});

	return ageSchema;
};
