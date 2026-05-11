/**
 * Calculates the age in years based on the given birth date and an optional death date.
 * If the death date is not provided, the age is calculated based on the current date.
 * The function accounts for leap years and varying month lengths to ensure accurate age calculation.
 * It also validates that the birth date is not in the future and that the death date (if provided) is not before the birth date.
 */
export function calculateAge(birthDate: Date | string | number, deathDate?: Date | string | number): number {
	const birth = new Date(birthDate);
	if (Number.isNaN(birth.getTime())) throw new Error('Invalid date');

	const endDate = deathDate ? new Date(deathDate) : new Date();
	if (Number.isNaN(endDate.getTime())) throw new Error('Invalid death date');
	if (endDate < birth) throw new Error('Death date cannot be before birth date');

	let age = endDate.getFullYear() - birth.getFullYear();
	const monthDiff = endDate.getMonth() - birth.getMonth();
	const dayDiff = endDate.getDate() - birth.getDate();

	// If the current month is before the birth month, or it's the birth month but the current day is before the birth day, then the person hasn't had their birthday yet this year, so subtract 1 from the age.
	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}

	return age;
}
