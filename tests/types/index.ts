export type TestCase<T = unknown> = {
	value: string;
	desc?: string;
	expected?: string | boolean;
	options?: T;
};

export type TestCases<T = unknown> = TestCase<T>[];
