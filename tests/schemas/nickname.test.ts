import { describe, it } from 'vitest';
import { vk, zk } from '../../src';
import type { TestCases } from '../types';
import { testSchema } from '../utils/parser';

describe('nickname', () => {
	describe('valid nicknames', () => {
		const validCases: TestCases = [
			{ value: 'user_123', desc: 'basic nickname' },
			{ value: 'NickName', desc: 'with uppercase letters' },
			{ value: 'nick.name', desc: 'with dot' },
			{ value: 'nick-name', desc: 'with hyphen' },
			{ value: 'nick name', desc: 'with whitespace' },
			{ value: 'user123', desc: 'with numbers' },
			{ value: 'valid_and_maximum_len_nickname', desc: 'maximum length' },
		];

		it.each(validCases)(
			'should pass - $value ($desc)',
			testSchema([zk.nickname(), vk.nickname()], true),
		);
	});

	describe('invalid nicknames', () => {
		const invalidCases: TestCases = [
			{ value: 'ab', desc: 'too short' },
			{
				value:
					'this_is_a_long_nickname_that_exceeds_the_maximum_length_allowed',
				desc: 'too long',
			},
			{ value: 'invalid-char!', desc: 'invalid characters' },
			{ value: 'invalid@char', desc: 'special characters not allowed' },
			{ value: '', desc: 'empty string' },
			{ value: '用户', desc: 'non-latin characters' },
		];

		it.each(invalidCases)(
			'should fail - $value ($desc)',
			testSchema([zk.nickname(), vk.nickname()], false),
		);
	});

	describe('nickname (options)', () => {
		const validCases: TestCases = [
			{
				value: 'nickname',
				desc: 'with custom options',
				expected: true,
			},
			{
				value: 'custom_nickname',
				desc: 'with custom options',
				expected: false,
			},
		];
		const options = { min: 5, max: 10 };

		it.each(validCases)(
			'should pass with custom options - $value ($desc)',
			testSchema([zk.nickname(options), vk.nickname(options)], true),
		);
	});

	describe('nickname (noDigit())', () => {
		const testCases: TestCases = [
			{
				value: 'nickname',
				desc: 'without digits',
				expected: true,
			},
			{
				value: 'nickname123',
				desc: 'with digits',
				expected: false,
			},
			{
				value: 'nickname_without_digit',
				desc: 'without digit',
				expected: true,
			},
		];

		it.each(testCases)(
			'should $expected noDigit - $value ($desc)',
			testSchema([zk.nickname().noDigit(), vk.nickname().noDigit()]),
		);
	});

	describe('nickname (noConsecutiveSpecial())', () => {
		const testCases: TestCases = [
			{
				value: 'valid_nickname.',
				desc: 'without consecutive special characters',
				expected: true,
			},
			{
				value: 'invalid__nickname',
				desc: 'with consecutive underscores',
				expected: false,
			},
			{
				value: 'invalid--nickname',
				desc: 'with consecutive hyphens',
				expected: false,
			},
			{
				value: 'invalid..nickname',
				desc: 'with consecutive dots',
				expected: false,
			},
		];

		it.each(testCases)(
			'should $expected noConsecutiveSpecial - $value ($desc)',
			testSchema([
				zk.nickname().noConsecutiveSpecial(),
				vk.nickname().noConsecutiveSpecial(),
			]),
		);
	});

	describe('nickname (noUnicode())', () => {
		const testCases: TestCases = [
			{
				value: 'سلام',
				desc: 'unicode characters',
				expected: false,
			},
			{
				value: 'user_用户',
				desc: 'mixed latin and unicode',
				expected: false,
			},
		];

		it.each(testCases)(
			'should $expected noUnicode - $value ($desc)',
			testSchema([zk.nickname().noUnicode(), vk.nickname().noUnicode()]),
		);
	});

	describe('nickname (noSpaces())', () => {
		const testCases: TestCases = [
			{
				value: 'nick name',
				desc: 'with spaces',
				expected: false,
			},
			{
				value: 'invalid\tnickname',
				desc: 'with newline characters',
				expected: false,
			},
		];

		it.each(testCases)(
			'should $expected noSpaces - $value ($desc)',
			testSchema([zk.nickname().noSpaces(), vk.nickname().noSpaces()]),
		);
	});
});
