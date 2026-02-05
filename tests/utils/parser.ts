import type { AnySchema } from 'valibot';
import * as v from 'valibot';
import { expect } from 'vitest';
import type { ZodType } from 'zod';
import { vk, zk } from '../../src';

export const parseZod = (schema: ZodType, data: unknown) => schema.parse(data);

export const parseValibot = (schema: v.AnySchema, data: unknown) =>
	v.parse(schema, data);

export const safeParseZod = (schema: ZodType, data: unknown) =>
	schema.safeParse(data);

export const safeParseValibot = (schema: v.AnySchema, data: unknown) =>
	v.safeParse(schema, data);

export const assertZodError = (error: unknown, message: string) => {
	if (error instanceof Error) {
		expect(error.message).toContain(message);
	} else {
		throw new Error('The provided error is not an instance of Error');
	}
};
export const assertValibotError = (error: unknown, message: string) => {
	if (error instanceof Error) {
		expect(error.message).toContain(message);
	} else {
		throw new Error('The provided error is not an instance of Error');
	}
};

export const testParsers = (schemas: [ZodType, unknown], data: unknown) => {
	// Zod
	const zodResult = safeParseZod(schemas[0] as ZodType, data);

	// Valibot
	const valibotResult = safeParseValibot(schemas[1] as AnySchema, data);

	return {
		toBe: (expected: boolean) => {
			expect(valibotResult.success).toBe(expected);
			expect(zodResult.success).toBe(expected);
		},
	};
};

export const testResultParsers = (
	schemas: [ZodType, unknown],
	data: unknown,
) => {
	// Zod
	const zodResult = safeParseZod(schemas[0] as ZodType, data);

	// Valibot
	const valibotResult = safeParseValibot(schemas[1] as AnySchema, data);

	return {
		toBe: (expected: unknown) => {
			expect(valibotResult.output).toBe(expected);
			expect(zodResult.data).toBe(expected);
		},
	};
};

export const expectParsers = (
	method: keyof typeof zk & keyof typeof vk,
	data: unknown,
) => testParsers([zk[method](), vk[method]()], data);
