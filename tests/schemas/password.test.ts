import { describe, it } from 'vitest';
import { vk, zk } from '../../src';
import type { PasswordStrength } from '../../src/core/shared/types';
import type { TestCases } from '../types';
import { testParsers, testSchema } from '../utils/parser';

describe('password', () => {
	describe('valid passwords', () => {
		const testCases: TestCases = [
			{ value: 'StrongP@ssw0rd!', desc: 'password - 1' },
			{ value: 'An0ther$trongPass', desc: 'password - 2' },
			{ value: 'Valid#Password123', desc: 'password - 3' },
			{
				value:
					'Valid**And*%Strong#Password&^123_456_789%@With$%Maximum*&Length!',
				desc: 'maximum length',
			},
			{ value: 'aaA1123!', desc: 'minimum length' },
		];

		it.each(testCases)(
			'should pass - $value ($desc)',
			testSchema([zk.password(), vk.password()], true),
		);

		describe('invalid passwords', () => {
			const invalidCases: TestCases = [
				{
					value: 'weakpass',
					desc: 'too short, no uppercase, no number, no special char',
				},
				{ value: 'Short1!', desc: 'too short' },
				{
					value:
						'ThisPasswordIsWayTooLongToBeConsideredValidBecauseItExceedsTheMaximumLength1!',
					desc: 'too long',
				},
				{ value: 'nouppercase1!', desc: 'no uppercase letter' },
				{ value: 'NOLOWERCASE1!', desc: 'no lowercase letter' },
				{ value: '', desc: 'empty string' },
				{ value: 'pecialChar', desc: 'no number' },
				{ value: 'NoSpecialChar1', desc: ' no special character' },
				{ value: '用户', desc: 'non-latin characters' },
				{ value: '  ', desc: 'only whitespace' },
			];

			it.each(invalidCases)(
				'should fail - %value ($desc)',
				testSchema([zk.password(), vk.password()], false),
			);
		});

		describe('password (strength)', () => {
			const strengthCases: TestCases<PasswordStrength> = [
				{ value: 'Weakpass1!', desc: 'weak', options: 'weak' },
				{ value: 'ModerateP@ss2', desc: 'medium', options: 'medium' },
				{ value: 'StrongP@ssw0rd!3', desc: 'strong', options: 'weak' },
			];

			it.each(strengthCases)(
				'should validate strength for %s as %s',
				({ value, options = 'weak' }) => {
					testParsers(
						[zk.password().strength(options), vk.password().strength(options)],
						value,
					).toBe(true);
				},
			);
		});

		describe('password (noCommon)', () => {
			const noCommonCases = [
				{
					value: 'P@ssw0rd',
					expected: false,
				},
				{
					value: 'StrongP@ssw0rd!',
					expected: true,
				},
			] as const;

			it.each(noCommonCases)(
				'should validate noCommon for %s as %s',
				testSchema([zk.password().noCommon(), vk.password().noCommon()]),
			);
		});

		describe('password (noSpaces)', () => {
			const noSpacesCases = [
				{
					value: 'No Spaces1!',
					expected: false,
				},
				{
					value: 'NoSpaces1!',
					expected: true,
				},
			] as const;

			it.each(noSpacesCases)(
				'should validate noSpaces for %s as %s',
				testSchema([zk.password().noSpaces(), vk.password().noSpaces()]),
			);
		});
	});
});
