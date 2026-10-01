import { defineConfig } from 'vite';

// 主题/组件可视化验证页：pnpm --filter @wc/core playground
export default defineConfig({
  root: 'playground',
  server: {
    port: 5180,
    open: false,
  },
  build: {
    outDir: 'playground-dist',
    emptyOutDir: true,
  },
});
