import { describe, it } from 'vitest';
import { vk, zk } from '../../src';
import type { TestCases } from '../types';
import { testResultSchema, testSchema } from '../utils/parser';

describe('slug', () => {
	describe('valid slugs', () => {
		const validCases: TestCases = [
			{ value: 'valid-slug', desc: 'basic slug' },
			{ value: 'another-valid-slug-123', desc: 'with numbers' },
			{ value: 'slug-with-multiple-parts', desc: 'multiple parts' },
			{ value: 'a', desc: 'single letter' },
			{ value: 'z-0-9', desc: 'mixed letters and numbers' },
			{ value: '123', desc: 'only numbers' },
			{ value: '1', desc: 'single digit' },
			{
				value: 'very-long-slug-with-many-parts-and-numbers-123',
				desc: 'long slug',
			},
		];

		it.each(validCases)(
			'should pass - $value ($desc)',
			testSchema([zk.slug(), vk.slug()], true),
		);
	});

	describe('invalid slugs', () => {
		const invalidCases: TestCases = [
			{ value: 'Invalid-Slug', desc: 'uppercase letters' },
			{ value: 'invalid_slug', desc: 'underscores' },
			{ value: 'invalid slug', desc: 'spaces' },
			{ value: 'invalid@slug!', desc: 'special characters' },
			{ value: '', desc: 'empty string' },
			{ value: '-leading-hyphen', desc: 'leading hyphen' },
			{ value: 'trailing-hyphen-', desc: 'trailing hyphen' },
			{ value: 'double--hyphen', desc: 'consecutive hyphens' },
			{ value: 'with/slash', desc: 'slash' },
			{ value: 'with.dot', desc: 'dot' },
			{ value: 'with..dot', desc: 'consecutive dots' },
			{ value: '-', desc: 'single hyphen' },
			{ value: 'Café', desc: 'unicode characters' },
			{ value: 'سلام', desc: 'non-latin characters' },
			{ value: ' leading-space', desc: 'leading space' },
			{ value: 'trailing-space ', desc: 'trailing space' },
		];

		it.each(invalidCases)(
			'should fail - $value ($desc)',
			testSchema([zk.slug(), vk.slug()], false),
		);
	});

	describe('slug (coerce)', () => {
		describe('should accepts already valid slugs (unchanged)', () => {
			const cases: TestCases = [
				{ value: 'hello', desc: 's' },
				{ value: 'valid-slug', desc: 's' },
				{ value: '123', desc: 's' },
				{ value: 'a-b-c', desc: 's' },
			];

			it.each(cases)(
				'should pass - $value ($desc)',
				testSchema([zk.slug().coerce(), vk.slug().coerce()], true),
			);
		});

		describe('should coerces and accepts inputs that become valid', () => {
			const cases: TestCases = [
				{
					value: 'Hello World',
					expected: 'hello-world',
					desc: 'basic coercion',
				},
				{
					value: '  Multiple   Spaces  ',
					expected: 'multiple-spaces',
					desc: 'extra spaces',
				},
				{
					value: 'Invalid@Slug!',
					expected: 'invalidslug',
					desc: 'special characters',
				},
				{
					value: 'Café Éclair',
					expected: 'cafe-eclair',
					desc: 'diacritics removal',
				},
				{
					value: '  --test--slug--  ',
					expected: 'test-slug',
					desc: 'leading/trailing hyphens',
				},
				{
					value: 'UPPER-CASE',
					expected: 'upper-case',
					desc: 'uppercase to lowercase',
				},
				{
					value: 'slug123!@#',
					expected: 'slug123',
					desc: 'trailing special characters',
				},
				{
					value: '  slug  space  multiple  ',
					expected: 'slug-space-multiple',
					desc: 'multiple spaces',
				},
				{ value: 'éèàçôñ', expected: 'eeacon', desc: 'only diacritics' },

				{
					value: 'slug--double',
					expected: 'slug-double',
					desc: 'double hyphens remain invalid',
				},
			];

			it.each(cases)(
				'should fail - $value ($desc)',
				testResultSchema([zk.slug().coerce(), vk.slug().coerce()]),
			);
		});

		describe('should rejects inputs that become empty after coercion', () => {
			const cases: TestCases = [
				{ value: '', desc: 'already empty' },
				{ value: '   ', desc: 'only spaces' },
				{ value: '@#!$', desc: 'only special chars' },
				{ value: '---', desc: 'only hyphens' },
			];

			it.each(cases)(
				'should fail - $value ($desc)',
				testSchema([zk.slug().coerce(), vk.slug().coerce()], false),
			);
		});
	});
});
