export type TestCase<T = unknown> = {
	value: unknown;
	desc?: string;
	expected?: unknown;
	options?: T;
};

export type TestCases<T = unknown> = TestCase<T>[];
