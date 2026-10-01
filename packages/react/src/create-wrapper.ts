import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';

/**
 * 包装器公共工厂：预绑定 React 命名空间。
 * 事件映射沿用 @lit/react 约定——events 的 key 即组件 props 名（如 onWcChange），
 * value 是自定义元素派发的事件名（wc-change）。
 * 事件名统一标注为 EventName<CustomEvent>，使回调参数获得 CustomEvent 类型。
 */
export function createWrapper<
  I extends HTMLElement,
  E extends Record<string, string> = Record<never, never>,
>(options: { tagName: string; elementClass: new () => I; events?: E; displayName: string }) {
  return createComponent({
    react: React,
    ...options,
    events: options.events as { [K in keyof E]: EventName<CustomEvent> } | undefined,
  });
}
