import { css } from 'lit';

export const selectStyles = css`
  :host {
    display: inline-block;
    width: 240px;

    /* component 层令牌 */
    --wc-select-height: 32px;
    --wc-select-padding-x: var(--wc-space-2);
    --wc-select-font-size: var(--wc-font-size-medium);
    --wc-select-radius: var(--wc-radius-medium);
    --wc-select-panel-max-height: 280px;
  }

  :host([size='small']) {
    --wc-select-height: 24px;
    --wc-select-padding-x: var(--wc-space-1);
    --wc-select-font-size: var(--wc-font-size-small);
  }

  :host([size='large']) {
    --wc-select-height: 40px;
    --wc-select-padding-x: var(--wc-space-3);
    --wc-select-font-size: var(--wc-font-size-large);
  }

  .select {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-1);
    width: 100%;
    height: var(--wc-select-height);
    padding: 0 var(--wc-select-padding-x);
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-select-radius);
    cursor: pointer;
    user-select: none;
    transition:
      border-color var(--wc-duration-fast) var(--wc-easing-standard),
      box-shadow var(--wc-duration-fast) var(--wc-easing-standard);
  }

  /* 与 input 的 focus-within 对齐：键盘聚焦或展开时均呈现焦点视觉 */
  .trigger:focus-visible,
  :host([open]) .trigger {
    outline: none;
    border-color: var(--wc-color-primary);
    box-shadow: 0 0 0 2px var(--wc-color-focus-ring);
  }

  .value {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--wc-select-font-size);
    color: var(--wc-color-text);
  }

  .value.placeholder {
    color: var(--wc-color-text-placeholder);
  }

  .arrow {
    font-size: 16px;
    color: var(--wc-color-text-placeholder);
    flex-shrink: 0;
    transition: transform var(--wc-duration-fast) var(--wc-easing-standard);
  }

  :host([open]) .arrow {
    transform: rotate(180deg);
  }

  .clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    font-size: 16px;
    color: var(--wc-color-text-placeholder);
    border-radius: var(--wc-radius-circle);
    flex-shrink: 0;
    opacity: 0;
    transition: opacity var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .clear:hover {
    color: var(--wc-color-text-secondary);
  }

  /* 悬停触发器时显示清除按钮 */
  .trigger:hover .clear,
  .trigger:focus-visible .clear {
    opacity: 1;
  }

  /* 有清除按钮时悬停隐藏箭头，避免拥挤 */
  .trigger:hover .clear + .arrow {
    display: none;
  }

  .panel {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: var(--wc-z-index-dropdown);
    width: 100%;
    max-height: var(--wc-select-panel-max-height);
    overflow-y: auto;
    padding: var(--wc-space-1) 0;
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-select-radius);
    box-shadow: var(--wc-shadow-2);
  }

  .panel[hidden] {
    display: none;
  }

  .empty {
    padding: var(--wc-space-4) var(--wc-space-3);
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text-placeholder);
    text-align: center;
  }

  /* ---- 校验状态 ---- */
  :host([status='success']) .trigger {
    border-color: var(--wc-color-success);
  }

  :host([status='warning']) .trigger {
    border-color: var(--wc-color-warning);
  }

  :host([status='error']) .trigger {
    border-color: var(--wc-color-error);
  }

  :host([status='error']) .trigger:focus-visible,
  :host([status='error'][open]) .trigger {
    border-color: var(--wc-color-error);
    box-shadow: 0 0 0 2px var(--wc-color-error-light);
  }

  /* ---- 禁用 ---- */
  :host([disabled]) .trigger {
    background-color: var(--wc-color-bg-disabled);
    border-color: transparent;
    cursor: not-allowed;
  }

  :host([disabled]) .value {
    color: var(--wc-color-text-disabled);
  }
`;
