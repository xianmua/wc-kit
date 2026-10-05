import { defineConfig } from 'vitepress';
import { componentSidebar } from './sidebar.data';

export default defineConfig({
  lang: 'zh-CN',
  title: 'WUI',
  description: '基于 Lit 3 的 Web Components 组件库，一份代码同时服务 React / Vue / 原生页面',

  // <wc-*> 是原生自定义元素，不让 Vue 当作组件解析
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('wc-'),
      },
    },
  },

  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],

  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/upload' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '快速上手', link: '/guide/getting-started' }],
        },
      ],
      '/components/': componentSidebar,
    },
    socialLinks: [],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清空关键词',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'short' } },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
  },
});
