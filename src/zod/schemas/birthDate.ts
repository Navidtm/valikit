import * as z from 'zod';

import type { BirthDateOptions } from '../../core/shared/types.js';
import { calculateAge } from '../../core/utils/calculateAge.js';
import { validateAge } from '../../core/utils/validateAge.js';

/**
 * Zod schema for validating birth date + calculating actual age.
 * Input: Date | string (ISO) | number (timestamp)
 * @example
 * ```ts
 * zk.birthDate().parse(new Date("2000-01-01"));
 * zk.birthDate().parse("2000-01-01");
 * zk.birthDate().parse(946684800000); // timestamp for 2000-01-01
 * zk.birthDate().adult().parse("2000-01-01"); // Must be at least 18 years old
 * zk.birthDate().teen().parse("2010-01-01"); // Must be a teenager (13-19 years)
 * zk.birthDate({ minAge: 21 }).parse("2005-01-01"); // Must be at least 21 years old
 * ```
 * All shortcuts are chainable and return an independent schema.
 * Note: Age calculations are based on the current date at the time of validation.
 */
export const birthDate = (options?: BirthDateOptions) => {
	const baseSchema = z.date().max(new Date());
	const schema = baseSchema.refine((date) => validateAge(date, options));

	return Object.assign(schema, {
		minAge: (age: number) => birthDate({ minAge: age }),
		maxAge: (age: number) => birthDate({ maxAge: age }),

		/**
		 * Child (0 to 12 years)
		 */
		child: () =>
			baseSchema.refine((date) =>
				validateAge(date, { ...options, maxAge: 12 }),
			),
		/**
		 * Preteen (9 to 12 years)
		 */
		preTeen: () =>
			baseSchema.refine((date) =>
				validateAge(date, { ...options, minAge: 9, maxAge: 12 }),
			),
		/**
		 * Teenager (13 to 19 years)
		 */
		teen: () =>
			baseSchema.refine((date) =>
				validateAge(date, { ...options, minAge: 13, maxAge: 19 }),
			),
		/**
		 * Minor (less than 18 years)
		 */
		minor: () =>
			baseSchema.refine((date) =>
				validateAge(date, { ...options, maxAge: 17 }),
			),
		/**
		 * Young Adult (18 to 25 years)
		 */
		youngAdult: () =>
			baseSchema.refine((date) =>
				validateAge(date, { ...options, minAge: 18, maxAge: 25 }),
			),
		/**
		 * Adult (18 years or older)
		 */
		adult: () =>
			baseSchema.refine((date) =>
				validateAge(date, { ...options, minAge: 18 }),
			),
		/**
		 * Senior (60 years or older)
		 */
		senior: () =>
			baseSchema.refine((date) =>
				validateAge(date, { ...options, minAge: 60 }),
			),
		/**
		 * Elderly (75 years or older)
		 */
		elderly: () =>
			baseSchema.refine((date) =>
				validateAge(date, { ...options, minAge: 75 }),
			),
		/**
		 * Transforms the birth date into the calculated age (in years)
		 * @example zk.birthDate().toAge().parse("2000-01-01") // returns 24 (as of 2024)
		 */
		toAge: () =>
			schema.transform((date) => calculateAge(date, options?.deathDate)),
		/**
		 * Transforms the birth date into the number of years until reaching adulthood (18 years)
		 * @example zk.birthDate().untilAdult().parse("2010-01-01") // returns 4 (as of 2024)
		 */
		untilAdult: () =>
			schema.transform((date) => 18 - calculateAge(date, options?.deathDate)),
		/**
		 * Transforms the birth date into the number of years until reaching senior status (65 years)
		 * @example zk.birthDate().untilSenior().parse("1960-01-01") // returns 1 (as of 2024)
		 */
		untilSenior: () =>
			schema.transform((date) => 65 - calculateAge(date, options?.deathDate)),
	});
};
/[a-z]/


