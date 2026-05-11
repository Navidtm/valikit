import { describe, it } from 'vitest';
import { vk, zk } from '../../src';
import type { BirthDateOptions } from '../../src/core/shared/types';
import type { TestCases } from '../types';

import { testResultSchema, testSchema } from '../utils/parser';

describe('birthDate', () => {
	describe('valid cases', () => {
		const validCases: TestCases<BirthDateOptions> = [
			{
				value: new Date('1990-01-01'),
				desc: 'valid birth date',
			},
			{
				value: new Date('2000-12-31'),
				desc: 'valid birth date at the end of the year',
			},
			{
				value: new Date('1985-06-15'),
				desc: 'valid birth date in the middle of the year',
			},
			{
				value: new Date('2020-02-29'),
				desc: 'valid leap year birth date',
			},
			{
				value: new Date('1900-01-01'),
				desc: 'valid birth date at the beginning of the 20th century',
			},
			{
				value: new Date('2024-02-29'),
				desc: 'valid leap year birth date in the future',
			},
			{
				value: new Date('1995-12-31'),
				desc: 'valid birth date at the end of the year',
			},
			{
				value: new Date('1999-09-09'),
				desc: 'valid birth date with repeating digits',
			},
		].map((v) => ({ ...v, expected: v.value }));

		it.each(validCases)(
			'should validate valid birth dates',
			testResultSchema([zk.birthDate(), vk.birthDate()]),
		);
	});

	describe('invalid cases', () => {
		const invalidCases: TestCases = [
			{ value: '2125-01-01', desc: 'birth date in the future' },
			{ value: '1880-01-01', desc: 'birth date too far in the past' },
			{ value: '2024-02-30', desc: 'invalid date (February 30th)' },
			{ value: '2010-23-22', desc: 'invalid month' },

			{ value: 'not-a-date', desc: 'completely invalid string' },
			{ value: '', desc: 'empty string' },
			{ value: null, desc: 'null value' },
			{ value: undefined, desc: 'undefined value' },
			{ value: {}, desc: 'object instead of date' },
			{ value: [], desc: 'array instead of date' },
			{ value: 1234567890, desc: 'number instead of date' },
		];

		it.each(invalidCases)(
			'should validate invalid birth dates',
			testSchema([zk.birthDate(), vk.birthDate()], false),
		);
	});
});
