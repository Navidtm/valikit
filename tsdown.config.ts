import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: 'src/index.ts',
	format: ['cjs', 'esm'],
	dts: true,
	clean: true,
	sourcemap: true,
	platform: 'node',
	target: 'es2020',
	outDir: 'dist',
});
