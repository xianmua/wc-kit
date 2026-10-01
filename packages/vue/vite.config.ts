import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'wcVue',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [/^lit/, /^vue/, /^@wc\//],
    },
    sourcemap: true,
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      // 全局类型增强（declare module 'vue'）无法被 rollup 合并，直接输出原始 d.ts
      rollupTypes: false,
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.d.ts'],
    }),
  ],
});
