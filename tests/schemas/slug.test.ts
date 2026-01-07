import { describe, expect, it } from 'vitest';
import * as v from 'valibot';

import { zk, vk } from '../../src';

const testSlug = (slug: string, shouldPass: boolean) => {
	// Zod
	const zodResult = zk.slug().safeParse(slug);
	expect(zodResult.success).toBe(shouldPass);

	// Valibot
	const valibotResult = v.safeParse(vk.slug(), slug);
	expect(valibotResult.success).toBe(shouldPass);
};

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
			testSlug(slug, true);
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
			testSlug(slug, false);
		});
	});
});
