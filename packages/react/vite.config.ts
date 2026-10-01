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
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
});
