import * as v from 'valibot';
import { describe, expect, it } from 'vitest';

import { vk, zk } from '../../src';

const testpassword = (password: string, shouldPass: boolean) => {
	// Zod
	const zodResult = zk.password().safeParse(password);
	expect(zodResult.success).toBe(shouldPass);

	// Valibot
	const valibotResult = v.safeParse(vk.password(), password);
	expect(valibotResult.success).toBe(shouldPass);
};

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
			testpassword(password, true);
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
			testpassword(password, false);
		});
	});
});
