import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // vitest 默认按 node 条件解析到 @lit/react 的 SSR 构建（node/development），
      // 该构建不做客户端 props/事件绑定，jsdom 测试中必须指到浏览器构建
      '@lit/react': fileURLToPath(
        new URL('./node_modules/@lit/react/development/index.js', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'jsdom',
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    globals: true,
    include: ['src/**/*.test.ts'],
  },
});
