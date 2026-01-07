import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: {
		index: './src/index.ts',
		'zk/index': './src/zod/index.ts',
		'vk/index': './src/valibot/index.ts',
	},
	format: ['esm'],
	dts: true,
	clean: true,
	sourcemap: true,
	platform: 'node',
	target: 'es2020',
	outDir: 'dist',
	publint: true,
});
