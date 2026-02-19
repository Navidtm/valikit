import { describe, it } from 'vitest';
import { vk, zk } from '../../src';
import type { TestCases } from '../types';
import { testResultSchema, testSchema } from '../utils/parser';

describe('username', () => {
	describe('valid usernames', () => {
		const validCases: TestCases = [
			{ value: 'valid_username', desc: 'basic username' },
			{ value: 'anothervalid123', desc: 'with numbers' },
			{ value: 'user_name_123', desc: 'mixed letters and numbers' },
			{ value: 'abc', desc: 'minimum length' },
			{ value: 'a'.repeat(30), desc: 'maximum length' },
		];

		it.each(validCases)(
			'should pass - $value ($desc)',
			testSchema([zk.username(), vk.username()], true),
		);
	});

	describe('invalid usernames', () => {
		const invalidCases: TestCases = [
			{ value: 'Invalid-Username', desc: 'uppercase letters and hyphen' },
			{ value: 'invalid username', desc: 'spaces' },
			{ value: 'in', desc: 'too short' },
			{
				value: 'this_username_is_way_too_long_to_be_valid',
				desc: 'too long',
			},
			{ value: 'invalid@username!', desc: 'special characters' },
			{ value: '', desc: 'empty string' },
			{ value: 'user.name', desc: 'dot character' },
			{ value: 'user-name', desc: 'hyphen character' },
			{ value: 'user$name', desc: 'dollar sign' },
			{ value: '用户', desc: 'non-latin characters' },
			{ value: '  ', desc: 'only whitespace' },
		];

		it.each(invalidCases)(
			'should fail - $value ($desc)',
			testSchema([zk.password(), vk.password()], false),
		);
	});

	describe('username (coerce)', () => {
		const validCases: TestCases = [
			{
				value: '  trimmed_username  ',
				desc: 'with whitespace to trim',
				expected: 'trimmed_username',
			},
			{
				value: 'white space username',
				desc: 'with whitespace to trim',
				expected: 'white_space_username',
			},
			{
				value: '!user@?name-',
				desc: 'remove invalid chars',
				expected: 'username',
			},
			{
				value: '  User Name !@#  ',
				desc: 'need to trim and remove  invalid chars',
				expected: 'user_name',
			},
		];

		it.each(validCases)(
			'should be - $expected ($value)',
			testResultSchema([zk.username().coerce(), vk.username().coerce()]),
		);

		describe('username (coerce) invalid cases', () => {
			const invalidCases: TestCases = [
				{
					value: '  !!@@##  ',
					desc: 'only invalid characters',
				},
				{
					value: '  a  ',
					desc: 'too short after coercion',
				},
				{
					value: '  this_username_is_way_too_long_to_be_valid  ',
					desc: 'too long after coercion',
				},
			];

			it.each(invalidCases)(
				'should fail - $value ($desc)',
				testSchema([zk.username().coerce(), vk.username().coerce()], false),
			);
		});

		describe('username (noReservedWords)', () => {
			const reservedWords: TestCases = [
				{ value: 'admin' },
				{ value: 'root' },
				{ value: 'system' },
				{ value: 'administrator' },
			];

			it.each(reservedWords)(
				'should fail - $value ($desc)',
				testSchema(
					[zk.username().noReserved(), vk.username().noReserved()],
					false,
				),
			);
		});
	});
});
