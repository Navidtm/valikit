export type PasswordStrength = 'weak' | 'medium' | 'strong';

export type PasswordOptions = Partial<{
	min: number;
	max: number;
	minLowercase: number;
	minUppercase: number;
	minNumber: number;
	minSymbol: number;
}>;
