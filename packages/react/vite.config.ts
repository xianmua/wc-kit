import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'wcReact',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [/^lit/, /^react/, /^react-dom/, /^@wc\//],
    },
    sourcemap: true,
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      // JSX 全局类型增强（declare global / declare module 'react'）无法被 rollup 合并，
      // 直接输出原始 d.ts（同 @wc-kit/vue 的做法）
      rollupTypes: false,
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.d.ts'],
      exclude: ['src/**/*.test.ts'],
    }),
  ],
});
