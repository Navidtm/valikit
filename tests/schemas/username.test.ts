import { describe, it } from 'vitest';
import { vk, zk } from '../../src';
import { expectParsers, testParsers, testResultParsers } from '../utils/parser';

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
			expectParsers('username', username).toBe(true);
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
			expectParsers('username', username).toBe(false);
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
			testResultParsers(
				[zk.username().coerce(), vk.username().coerce()],
				username,
			).toBe(expect);
		});

		describe('username (coerce) invalid cases', () => {
			const invalidCases = [
				{
					username: '  !!@@##  ',
					desc: 'only invalid characters',
				},
				{
					username: '  a  ',
					desc: 'too short after coercion',
				},
				{
					username: '  this_username_is_way_too_long_to_be_valid  ',
					desc: 'too long after coercion',
				},
			];

			it.each(invalidCases)('should fail - %s ("%s")', ({ username }) => {
				expectParsers('username', username).toBe(false);
			});
		});

		describe('username (noReservedWords)', () => {
			const reservedWords = ['admin', 'root', 'system', 'administrator'];

			it.each(reservedWords)('should fail - %s', (word) => {
				testParsers(
					[zk.username().noReserved(), vk.username().noReserved()],
					word,
				).toBe(false);
			});
		});
	});
});
