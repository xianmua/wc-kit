import { css } from 'lit';

/**
 * 菜单项基础样式：wc-menu-item 与 wc-sub-menu 的展开头共用，
 * 保证两类条目视觉完全一致。
 */
export const menuItemStyles = css`
  :host {
    display: block;
    min-width: 0;
  }

  .item {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--wc-space-2);
    width: 100%;
    height: var(--wc-menu-item-height, 40px);
    padding: 0 var(--wc-space-3);
    border-radius: var(--wc-menu-item-radius, var(--wc-radius-small));
    color: var(--wc-color-text);
    font-size: var(--wc-font-size-medium);
    line-height: 1;
    cursor: pointer;
    user-select: none;
    outline: none;
    box-sizing: border-box;
    transition:
      background-color var(--wc-duration-fast) var(--wc-easing-standard),
      color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .ico {
    display: flex;
    flex: none;
    align-items: center;
    font-size: 16px;
  }

  .label {
    overflow: hidden;
    flex: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ---- 悬停 ---- */
  .item:not(.disabled):hover {
    background-color: var(--wc-color-bg-hover);
  }

  /* ---- 选中：浅主题底 + 主题色文字 + 指示条（垂直左条 / 水平底条，与 Tabs 指示线同语言） ---- */
  .item.selected {
    background-color: var(--wc-color-primary-light);
    color: var(--wc-color-primary);
    font-weight: var(--wc-font-weight-semibold);
  }

  .item.selected::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 3px;
    height: 60%;
    background-color: var(--wc-color-primary);
    border-radius: var(--wc-radius-round);
    transform: translateY(-50%);
  }

  :host([menu-horizontal]) .item.selected::before {
    top: auto;
    right: var(--wc-space-3);
    bottom: 0;
    left: var(--wc-space-3);
    width: auto;
    height: 2px;
    transform: none;
  }

  /* ---- 危险 ---- */
  :host([danger]) .item {
    color: var(--wc-color-error);
  }
  :host([danger]) .item:not(.disabled):hover {
    background-color: color-mix(in srgb, var(--wc-color-error) 10%, transparent);
  }

  /* ---- 禁用 ---- */
  .item.disabled {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
  }

  /* ---- 聚焦环：内嵌避免溢出圆角 ---- */
  .item:focus-visible {
    outline: 2px solid var(--wc-color-primary);
    outline-offset: -2px;
  }
`;
