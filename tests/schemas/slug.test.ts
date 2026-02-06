import { describe, it } from 'vitest';
import { vk, zk } from '../../src';
import { expectParsers, testParsers, testResultParsers } from '../utils/parser';

describe('slug', () => {
	describe('valid slugs', () => {
		const validCases = [
			{ slug: 'valid-slug', desc: 'basic slug' },
			{ slug: 'another-valid-slug-123', desc: 'with numbers' },
			{ slug: 'slug-with-multiple-parts', desc: 'multiple parts' },
			{ slug: 'a', desc: 'single letter' },
			{ slug: 'z-0-9', desc: 'mixed letters and numbers' },
			{ slug: '123', desc: 'only numbers' },
			{ slug: '1', desc: 'single digit' },
			{
				slug: 'very-long-slug-with-many-parts-and-numbers-123',
				desc: 'long slug',
			},
		];

		it.each(validCases)('should pass - %s ("%s")', ({ slug }) => {
			expectParsers('slug', slug).toBe(true);
		});
	});

	describe('invalid slugs', () => {
		const invalidCases = [
			{ slug: 'Invalid-Slug', desc: 'uppercase letters' },
			{ slug: 'invalid_slug', desc: 'underscores' },
			{ slug: 'invalid slug', desc: 'spaces' },
			{ slug: 'invalid@slug!', desc: 'special characters' },
			{ slug: '', desc: 'empty string' },
			{ slug: '-leading-hyphen', desc: 'leading hyphen' },
			{ slug: 'trailing-hyphen-', desc: 'trailing hyphen' },
			{ slug: 'double--hyphen', desc: 'consecutive hyphens' },
			{ slug: 'with/slash', desc: 'slash' },
			{ slug: 'with.dot', desc: 'dot' },
			{ slug: 'with..dot', desc: 'consecutive dots' },
			{ slug: '-', desc: 'single hyphen' },
			{ slug: 'Café', desc: 'unicode characters' },
			{ slug: 'سلام', desc: 'non-latin characters' },
			{ slug: ' leading-space', desc: 'leading space' },
			{ slug: 'trailing-space ', desc: 'trailing space' },
		];

		it.each(invalidCases)('should fail - %s ("%s")', ({ slug }) => {
			expectParsers('slug', slug).toBe(false);
		});
	});

	describe('slug (coerce)', () => {
		it('should accepts already valid slugs (unchanged)', () => {
			const cases = ['hello', 'valid-slug', '123', 'a-b-c'];
			cases.forEach((input) => {
				testParsers([zk.slug().coerce(), vk.slug().coerce()], input).toBe(true);
			});
		});

		describe('should coerces and accepts inputs that become valid', () => {
			const cases = [
				{
					input: 'Hello World',
					expected: 'hello-world',
					desc: 'basic coercion',
				},
				{
					input: '  Multiple   Spaces  ',
					expected: 'multiple-spaces',
					desc: 'extra spaces',
				},
				{
					input: 'Invalid@Slug!',
					expected: 'invalidslug',
					desc: 'special characters',
				},
				{
					input: 'Café Éclair',
					expected: 'cafe-eclair',
					desc: 'diacritics removal',
				},
				{
					input: '  --test--slug--  ',
					expected: 'test-slug',
					desc: 'leading/trailing hyphens',
				},
				{
					input: 'UPPER-CASE',
					expected: 'upper-case',
					desc: 'uppercase to lowercase',
				},
				{
					input: 'slug123!@#',
					expected: 'slug123',
					desc: 'trailing special characters',
				},
				{
					input: '  slug  space  multiple  ',
					expected: 'slug-space-multiple',
					desc: 'multiple spaces',
				},
				{ input: 'éèàçôñ', expected: 'eeacon', desc: 'only diacritics' },

				{
					input: 'slug--double',
					expected: 'slug-double',
					desc: 'double hyphens remain invalid',
				},
			];

			it.each(cases)('should be - %s ("%s")', ({ input, expected }) => {
				testResultParsers([zk.slug().coerce(), vk.slug().coerce()], input).toBe(
					expected,
				);
			});
		});

		describe('should rejects inputs that become empty after coercion', () => {
			const cases = [
				{ input: '', expected: false, desc: 'already empty' },
				{ input: '   ', expected: false, desc: 'only spaces' },
				{ input: '@#!$', expected: false, desc: 'only special chars' },
				{ input: '---', expected: false, desc: 'only hyphens' },
			];

			it.each(cases)('should fail - %s ("%s")', ({ input, expected }) => {
				testParsers([zk.slug().coerce(), vk.slug().coerce()], input).toBe(
					expected,
				);
			});
		});
	});
});
