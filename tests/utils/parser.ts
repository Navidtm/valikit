import type { AnySchema } from 'valibot';
import * as v from 'valibot';
import { expect } from 'vitest';
import type { ZodType } from 'zod';
import { vk, zk } from '../../src';
import type { TestCase } from '../types';

export const parseZod = (schema: ZodType, data: unknown) => schema.parse(data);

export const parseValibot = (schema: v.AnySchema, data: unknown) =>
	v.parse(schema, data);

export const safeParseZod = (schema: ZodType, data: unknown) =>
	schema.safeParse(data);

export const safeParseValibot = (schema: v.AnySchema, data: unknown) =>
	v.safeParse(schema, data);

export const testParsers = (schemas: [ZodType, unknown], data: unknown) => {
	// Zod
	const zodResult = schemas[0].safeParse(data);

	// Valibot
	const valibotResult = v.safeParse(schemas[1] as AnySchema, data);

	return {
		toBe: (expected: unknown) => {
			expect(valibotResult.success).toBe(expected);
			expect(zodResult.success).toBe(expected);
		},
	};
};

export const testResultParsers = (
	schemas: [ZodType, AnySchema | unknown],
	data: unknown,
) => {
	// Zod
	const zodResult = safeParseZod(schemas[0], data);

	// Valibot
	const valibotResult = safeParseValibot(schemas[1] as AnySchema, data);

	return {
		toBe: (expected: unknown) => {
			expect(valibotResult.output).toEqual(expected);
			expect(zodResult.data).toEqual(expected);
		},
	};
};

export const expectParsers = (
	method: keyof typeof zk & keyof typeof vk,
	data: unknown,
) => testParsers([zk[method](), vk[method]() as unknown as AnySchema], data);

export const testResultSchema =
	(schemas: [ZodType, unknown], defaultExpected?: unknown) =>
	({ value, expected }: TestCase) =>
		testResultParsers(schemas as [ZodType, AnySchema], value).toBe(
			expected ?? defaultExpected,
		);

export const testSchema =
	(schemas: [ZodType, unknown], defaultExpected?: unknown) =>
	({ value, expected }: TestCase) =>
		testParsers(schemas as [ZodType, AnySchema], value).toBe(
			expected ?? defaultExpected,
		);
