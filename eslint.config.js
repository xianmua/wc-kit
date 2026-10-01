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
      '**/storybook-static/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
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
);
