import type { BirthDateOptions } from '../shared/types.js';
import { calculateAge } from './calculateAge.js';

export const validateAge = (date: Date, options?: BirthDateOptions) => {
	const age = calculateAge(date, options?.deathDate);
	if (options?.maxAge && age > options.maxAge) {
		return false;
	}
	if (options?.minAge && age < options.minAge) {
		return false;
	}
	return true;
};
