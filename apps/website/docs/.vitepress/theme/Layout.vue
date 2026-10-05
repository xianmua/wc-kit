<script setup>
import DefaultTheme from 'vitepress/theme';
import { watch } from 'vue';
import { useData } from 'vitepress';

const { Layout } = DefaultTheme;
const { isDark } = useData();

// VitePress 暗色切换 → 联动 wc 主题（demo 内的组件跟随文档站变色）
// SSR（构建期）禁止触碰 @wc-kit/core，只能在浏览器导入
watch(
  isDark,
  (dark) => {
    if (import.meta.env.SSR) return;
    import('@wc-kit/core').then(({ setTheme }) => {
      setTheme(dark ? 'dark' : 'light', { persist: false });
    });
  },
  { immediate: true },
);
</script>

<template>
  <Layout />
</template>
