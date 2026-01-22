import * as v from 'valibot';
import { describe, expect, it } from 'vitest';

import { vk, zk } from '../../src';

const testCoerceUsername = (username: string, output: string) => {
	// Zod
	const zodResult = zk.username().coerce().safeParse(username);
	expect(zodResult.data).toBe(output);

	// Valibot
	const valibotResult = v.safeParse(vk.username().coerce(), username);

	expect(valibotResult.output).toBe(output);
};

const testUsername = (username: string, shouldPass: boolean) => {
	// Zod
	const zodResult = zk.username().safeParse(username);
	expect(zodResult.success).toBe(shouldPass);

	// Valibot
	const valibotResult = v.safeParse(vk.username(), username);
	expect(valibotResult.success).toBe(shouldPass);
};

describe('username', () => {
	describe('valid usernames', () => {
		const validCases = [
			{ username: 'valid_username', desc: 'basic username' },
			{ username: 'anothervalid123', desc: 'with numbers' },
			{ username: 'user_name_123', desc: 'mixed letters and numbers' },
			{ username: 'abc', desc: 'minimum length' },
			{ username: 'a'.repeat(30), desc: 'maximum length' },
		];

		it.each(validCases)('should pass - %s ("%s")', ({ username }) => {
			testUsername(username, true);
		});
	});

	describe('invalid usernames', () => {
		const invalidCases = [
			{ username: 'Invalid-Username', desc: 'uppercase letters and hyphen' },
			{ username: 'invalid username', desc: 'spaces' },
			{ username: 'in', desc: 'too short' },
			{
				username: 'this_username_is_way_too_long_to_be_valid',
				desc: 'too long',
			},
			{ username: 'invalid@username!', desc: 'special characters' },
			{ username: '', desc: 'empty string' },
			{ username: 'user.name', desc: 'dot character' },
			{ username: 'user-name', desc: 'hyphen character' },
			{ username: 'user$name', desc: 'dollar sign' },
			{ username: '用户', desc: 'non-latin characters' },
			{ username: '  ', desc: 'only whitespace' },
		];

		it.each(invalidCases)('should fail - %s ("%s")', ({ username }) => {
			testUsername(username, false);
		});
	});

	describe('username (coerce)', () => {
		const validCases = [
			{
				username: '  trimmed_username  ',
				desc: 'with whitespace to trim',
				expect: 'trimmed_username',
			},
			{
				username: 'white space username',
				desc: 'with whitespace to trim',
				expect: 'white_space_username',
			},
			{
				username: '!user@?name-',
				desc: 'remove invalid chars',
				expect: 'username',
			},
			{
				username: '  User Name !@#  ',
				desc: 'need to trim and remove  invalid chars',
				expect: 'user_name',
			},
		];

		it.each(validCases)('should be - %s ("%s")', ({ username, expect }) => {
			testCoerceUsername(username, expect);
		});
	});
});
