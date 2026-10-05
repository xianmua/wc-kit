// VitePress 主题扩展：注册 wc 组件与设计令牌。
// 注意：SSR（构建期）不能静态 import '@wc-kit/core'——Lit 的 customElements.define 在 Node 会崩溃，
// 必须在客户端动态导入。
import DefaultTheme from 'vitepress/theme';
import './custom.css';
import Layout from './Layout.vue';

let injected = false;

if (!import.meta.env.SSR) {
  void import('@wc-kit/core').then(({ registerBuiltinIcons, tokensCss, resetCss, initTheme }) => {
    if (injected) return;
    injected = true;
    registerBuiltinIcons();
    initTheme();
    // 组件库依赖的设计令牌与宿主 reset，与 playground 同一套注入方式
    const tokens = document.createElement('style');
    tokens.textContent = tokensCss;
    document.head.append(tokens);
    const reset = document.createElement('style');
    reset.textContent = resetCss;
    document.head.append(reset);
  });
}

export default {
  extends: DefaultTheme,
  Layout,
};
