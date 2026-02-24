import { describe, it } from 'vitest';
import { vk, zk } from '../../src';
import type { TestCases } from '../types';
import { testResultSchema, testSchema } from '../utils/parser';

describe('age', () => {
	const message = 'should return $expected for age $value';
	describe('valid ages', () => {
		const validCases: TestCases = [
			{ value: 34, desc: 'sample age' },
			{ value: 14, desc: 'sample age' },
			{ value: 0, desc: 'minimum age' },
			{ value: 150, desc: 'maximum age' },
		];

		it.each(validCases)(
			'should pass - $value ($desc)',
			testSchema([zk.age(), vk.age()], true),
		);
	});

	describe('invalid ages', () => {
		const invalidCase: TestCases = [
			{ value: -1, desc: 'negative age' },
			{ value: 3.5, desc: 'decimal age' },
			{ value: 'abc', desc: 'non-numeric string' },
			{ value: null, desc: 'null value' },
			{ value: undefined, desc: 'undefined value' },
			{ value: 151, desc: 'age above maximum' },
		];

		it.each(invalidCase)(
			'should fail - $value ($desc)',
			testSchema([zk.age(), vk.age()], false),
		);
	});

	describe('age (coerce)', () => {
		const testCases: TestCases = [
			{ value: '34', desc: 'string number', expected: 34 },
			{ value: 24.3, desc: 'decimal number', expected: 24 },
			{ value: '53.82', desc: 'string & decimal number', expected: 53 },
		];

		it.each(testCases)(
			message,
			testResultSchema([zk.age().coerce(), vk.age().coerce()]),
		);
	});

	describe('age (child)', () => {
		const testCases: TestCases = [
			{ value: 0, expected: true },
			{ value: 12, expected: true },
			{ value: 13, expected: false },
		];

		it.each(testCases)(
			message,
			testSchema([zk.age().child(), vk.age().child()]),
		);
	});

	describe('age (preTeen)', () => {
		const testCases: TestCases = [
			{ value: 8, expected: false },
			{ value: 9, expected: true },
			{ value: 12, expected: true },
			{ value: 13, expected: false },
		];

		it.each(testCases)(
			message,
			testSchema([zk.age().preTeen(), vk.age().preTeen()]),
		);
	});

	describe('age (teen)', () => {
		const testCases: TestCases = [
			{ value: 12, expected: false },
			{ value: 13, expected: true },
			{ value: 19, expected: true },
			{ value: 20, expected: false },
		];

		it.each(testCases)(message, testSchema([zk.age().teen(), vk.age().teen()]));
	});

	describe('age (minor)', () => {
		const testCases: TestCases = [
			{ value: 17, expected: true },
			{ value: 18, expected: false },
		];

		it.each(testCases)(
			message,
			testSchema([zk.age().minor(), vk.age().minor()]),
		);
	});

	describe('age (adult)', () => {
		const testCases: TestCases = [
			{ value: 18, expected: true },
			{ value: 30, expected: true },
			{ value: 17, expected: false },
		];

		it.each(testCases)(
			message,
			testSchema([zk.age().adult(), vk.age().adult()]),
		);
	});

	describe('age (senior)', () => {
		const testCases: TestCases = [
			{ value: 60, expected: true },
			{ value: 75, expected: true },
			{ value: 59, expected: false },
		];

		it.each(testCases)(
			message,
			testSchema([zk.age().senior(), vk.age().senior()]),
		);
	});

	describe('age (elderly)', () => {
		const testCases: TestCases = [
			{ value: 75, expected: true },
			{ value: 80, expected: true },
			{ value: 74, expected: false },
		];

		it.each(testCases)(
			message,
			testSchema([zk.age().elderly(), vk.age().elderly()]),
		);
	});
});
