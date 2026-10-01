import { css } from 'lit';

export const checkboxStyles = css`
  :host {
    display: inline-block;

    /* component 层令牌 */
    --wc-checkbox-size: 16px;
    --wc-checkbox-radius: var(--wc-radius-small);
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    gap: var(--wc-space-2);
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text);
    cursor: pointer;
    user-select: none;
  }

  /* 原生 input 隐藏但保持可聚焦（键盘空格切换） */
  .native {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: 0;
    opacity: 0;
    pointer-events: none;
  }

  .box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--wc-checkbox-size);
    height: var(--wc-checkbox-size);
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border-strong);
    border-radius: var(--wc-checkbox-radius);
    color: #ffffff;
    flex-shrink: 0;
    transition:
      background-color var(--wc-duration-fast) var(--wc-easing-standard),
      border-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .check {
    width: 12px;
    height: 12px;
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wc-duration-fast) var(--wc-easing-standard),
      transform var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .dash {
    position: absolute;
    width: 8px;
    height: 2px;
    border-radius: 1px;
    background: currentColor;
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wc-duration-fast) var(--wc-easing-standard),
      transform var(--wc-duration-fast) var(--wc-easing-standard);
  }

  /* 键盘焦点环 */
  .native:focus-visible + .box {
    box-shadow: 0 0 0 2px var(--wc-color-focus-ring);
  }

  /* 选中态 */
  :host([checked]) .box {
    background-color: var(--wc-color-primary);
    border-color: var(--wc-color-primary);
  }

  :host([checked]) .check {
    opacity: 1;
    transform: scale(1);
  }

  /* 半选态（优先于选中态图标） */
  :host([indeterminate]) .box {
    background-color: var(--wc-color-primary);
    border-color: var(--wc-color-primary);
  }

  :host([indeterminate]) .check {
    opacity: 0;
  }

  :host([indeterminate]) .dash {
    opacity: 1;
    transform: scale(1);
  }

  /* 悬停 */
  .checkbox:hover .box:not(.native:disabled + .box) {
    border-color: var(--wc-color-primary);
  }

  /* 禁用 */
  :host([disabled]) .checkbox {
    cursor: not-allowed;
    color: var(--wc-color-text-disabled);
  }

  :host([disabled]) .box {
    background-color: var(--wc-color-bg-disabled);
    border-color: var(--wc-color-border);
  }

  :host([disabled][checked]) .box,
  :host([disabled][indeterminate]) .box {
    background-color: var(--wc-color-border);
    border-color: var(--wc-color-border);
    color: var(--wc-color-text-disabled);
  }

  .label {
    line-height: var(--wc-line-height-base);
  }
`;
