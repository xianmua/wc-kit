import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/dist-playground/**',
      '**/playground-dist/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/.vitepress/cache/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        URL: 'readonly',
        fetch: 'readonly',
        Buffer: 'readonly',
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      // chai 断言风格（expect(x).to.be.true）会触发该规则
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    // 框架类型增强文件：ambient namespace / 空接口继承是 declare module 增强的惯用写法
    files: [
      'packages/react/src/jsx.ts',
      'packages/vue/src/global-components.ts',
      'packages/svelte/src/svelte-elements.ts',
      'packages/solid/src/jsx.ts',
    ],
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
);
