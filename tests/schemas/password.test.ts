import { describe, it } from 'vitest';

import { vk, zk } from '../../src';
import { expectParsers, testParsers } from '../utils/parser';

describe('password', () => {
	describe('valid passwords', () => {
		const validCases = [
			{ password: 'StrongP@ssw0rd!', desc: 'password - 1' },
			{ password: 'An0ther$trongPass', desc: 'password - 2' },
			{ password: 'Valid#Password123', desc: 'password - 3' },
			{
				password:
					'Valid**And*%Strong#Password&^123_456_789%@With$%Maximum*&Length!',
				desc: 'maximum length',
			},
			{ password: 'aaA1123!', desc: 'minimum length' },
		];

		it.each(validCases)('should pass - %s ("%s")', ({ password }) => {
			expectParsers('password', password).toBe(true);
		});
	});

	describe('invalid passwords', () => {
		const invalidCases = [
			{
				password: 'weakpass',
				desc: 'too short, no uppercase, no number, no special char',
			},
			{ password: 'Short1!', desc: 'too short' },
			{
				password:
					'ThisPasswordIsWayTooLongToBeConsideredValidBecauseItExceedsTheMaximumLength1!',
				desc: 'too long',
			},
			{ password: 'nouppercase1!', desc: 'no uppercase letter' },
			{ password: 'NOLOWERCASE1!', desc: 'no lowercase letter' },
			{ password: '', desc: 'empty string' },
			{ password: 'pecialChar', desc: 'no number' },
			{ password: 'NoSpecialChar1', desc: ' no special character' },
			{ password: '用户', desc: 'non-latin characters' },
			{ password: '  ', desc: 'only whitespace' },
		];

		it.each(invalidCases)('should fail - %s ("%s")', ({ password }) => {
			expectParsers('password', password).toBe(false);
		});
	});

	describe('password (strength)', () => {
		const strengthCases = [
			{ password: 'Weakpass1!', expectedStrength: 'weak' },
			{ password: 'ModerateP@ss2', expectedStrength: 'medium' },
			{ password: 'StrongP@ssw0rd!3', expectedStrength: 'strong' },
		] as const;

		it.each(strengthCases)(
			'should validate strength for %s as %s',
			({ password, expectedStrength }) => {
				testParsers(
					[
						zk.password().strength(expectedStrength),
						vk.password().strength(expectedStrength),
					],
					password,
				).toBe(true);
			},
		);
	});

	describe('password (noCommon)', () => {
		const noCommonCases = [
			{
				password: 'P@ssw0rd',
				shouldPass: false,
			},
			{
				password: 'StrongP@ssw0rd!',
				shouldPass: true,
			},
		] as const;

		it.each(noCommonCases)(
			'should validate noCommon for %s as %s',
			({ password, shouldPass }) => {
				testParsers(
					[zk.password().noCommon(), vk.password().noCommon()],
					password,
				).toBe(shouldPass);
			},
		);
	});

	describe('password (noSpaces)', () => {
		const noSpacesCases: {
			password: string;
			shouldPass: boolean;
		}[] = [
			{
				password: 'No Spaces1!',
				shouldPass: false,
			},
			{
				password: 'NoSpaces1!',
				shouldPass: true,
			},
		];

		it.each(noSpacesCases)(
			'should validate noSpaces for %s as %s',
			({ password, shouldPass }) => {
				testParsers(
					[zk.password().noSpaces(), vk.password().noSpaces()],
					password,
				).toBe(shouldPass);
			},
		);
	});
});
