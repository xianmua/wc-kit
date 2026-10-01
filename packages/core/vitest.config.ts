import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    // jsdom 在 opaque origin 下禁用 localStorage，需显式 URL
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    globals: true,
    include: ['src/**/*.test.ts'],
    // 让 CSS import（如 tokens.css?inline）返回真实内容而非空串
    css: true,
  },
});
