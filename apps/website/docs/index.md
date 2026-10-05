---
layout: home

hero:
  name: WUI
  text: Web Components 组件库
  tagline: 基于 Lit 3，一份代码同时服务 React / Vue / 原生页面，内置设计令牌与明暗主题
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/getting-started
    - theme: alt
      text: 组件列表
      link: /components/upload

features:
  - icon: 🧩
    title: 框架无关
    details: 标准 Web Components，React 与 Vue 均提供开箱即用的类型与包装
  - icon: 🎨
    title: 三层设计令牌
    details: primitive → semantic → component 全部 --wc- 前缀，暗色主题只覆盖语义层
  - icon: 🌓
    title: 明暗主题
    details: data-theme 属性驱动，支持跟随系统，切换实时生效
  - icon: 📦
    title: 轻 shadow DOM
    details: 样式完全隔离，通过 ::part 与 CSS 变量开放定制点
---
