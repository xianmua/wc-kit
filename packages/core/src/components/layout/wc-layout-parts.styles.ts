import { css } from 'lit';

/**
 * Layout 骨架（layout / header / content / footer / sider）样式。
 * 注意：wc-layout.styles.ts 是 Row/Col 栅格样式，别混淆。
 */

/** wc-layout 容器：子元素为轻 DOM，flex 直接作用于宿主 */
export const layoutBoxStyles = css`
  :host {
    display: flex;
    flex: auto;
    flex-direction: column;
    /* 宿主自身常作为嵌套子项，禁止被 flex 收缩为 0 */
    min-width: 0;
    min-height: 0;
  }

  /* 检测到 wc-layout-sider 子元素时自动横向（antd hasSider 同款） */
  :host(.auto-sider) {
    flex-direction: row;
  }
`;

export const layoutHeaderStyles = css`
  :host {
    display: block;
    flex: 0 0 auto;
    padding: var(--wc-layout-header-padding, var(--wc-space-4) var(--wc-space-6));
    background-color: var(--wc-layout-header-bg, var(--wc-color-bg-container));
    color: var(--wc-color-text);
  }
`;

export const layoutContentStyles = css`
  :host {
    display: block;
    flex: 1 1 auto;
    min-height: 0;
  }
`;

export const layoutFooterStyles = css`
  :host {
    display: block;
    flex: 0 0 auto;
    padding: var(--wc-layout-footer-padding, var(--wc-space-6));
    background-color: var(--wc-layout-footer-bg, var(--wc-color-bg-container));
    color: var(--wc-color-text);
  }
`;

/** Sider 侧边栏（dark/light 双主题 + 折叠触发器） */
export const layoutSiderStyles = css`
  :host {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    width: var(--wc-layout-sider-width, 200px);
    background-color: var(--wc-layout-sider-bg, var(--wc-color-gray-900));
    color: var(--wc-layout-sider-color, var(--wc-color-gray-100));
    transition: width var(--wc-duration-medium) var(--wc-easing-standard);
    overflow: hidden;
  }

  :host([collapsed]) {
    width: var(--wc-layout-sider-collapsed-width, 80px);
  }

  :host([collapsed][zero-width]) {
    width: 0;
  }

  :host([theme='light']) {
    background-color: var(--wc-layout-sider-bg, var(--wc-color-bg-container));
    color: var(--wc-layout-sider-color, var(--wc-color-text));
    border-right: 1px solid var(--wc-color-border);
  }

  .sider {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0;
    overflow: hidden auto;
  }

  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    height: 40px;
    border: none;
    background-color: var(--wc-layout-sider-trigger-bg, rgba(255, 255, 255, 0.2));
    color: inherit;
    cursor: pointer;
  }

  :host([theme='light']) .trigger {
    background-color: var(--wc-layout-sider-trigger-bg, var(--wc-color-bg-hover));
  }

  .trigger:hover {
    color: var(--wc-color-primary-light);
  }

  .trigger wc-icon {
    transition: transform var(--wc-duration-medium) var(--wc-easing-standard);
  }

  :host([collapsed]) .trigger wc-icon {
    transform: rotate(180deg);
  }
`;
