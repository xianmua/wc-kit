import type { Preview } from '@storybook/web-components-vite';

// 设计令牌 + 全局 reset + 全部自定义元素注册
import '@wc/core/tokens.css';
import '@wc/core/reset.css';
import '@wc/core';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: '浅色',
      values: [
        { name: '浅色', value: 'var(--wc-color-bg-container)' },
        { name: '深色', value: 'var(--wc-color-gray-900)' },
      ],
    },
  },
};

export default preview;
