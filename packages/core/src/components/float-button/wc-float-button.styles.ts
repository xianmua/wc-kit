import { css } from 'lit';

export const floatButtonStyles = css`
  :host {
    position: fixed;
    bottom: var(--wc-float-button-bottom, 24px);
    right: var(--wc-float-button-right, 24px);
    z-index: var(--wc-z-index-fab);
    display: inline-flex;

    /* component 层令牌 */
    --wc-float-button-size: 40px;
  }

  /* 回到顶部预设：未达滚动阈值时整体隐藏 */
  :host([backtop]:not([data-visible])) {
    display: none;
  }

  .fab {
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    width: var(--wc-float-button-size);
    height: var(--wc-float-button-size);
    padding: 0;
    color: var(--wc-color-text);
    font-size: var(--wc-font-size-medium);
    text-decoration: none;
    background-color: var(--wc-color-bg-container);
    border: 1px solid var(--wc-color-border);
    border-radius: var(--wc-radius-round);
    box-shadow: var(--wc-shadow-2);
    cursor: pointer;
    transition:
      color var(--wc-duration-fast) var(--wc-easing-standard),
      border-color var(--wc-duration-fast) var(--wc-easing-standard),
      box-shadow var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .fab:hover {
    color: var(--wc-color-primary);
    border-color: var(--wc-color-primary);
  }

  .fab:focus-visible {
    outline: var(--wc-color-focus-ring) solid 2px;
    outline-offset: 2px;
  }

  .ico {
    /* flex 化：wc-icon 是 inline-flex 无文本基线（基线=底边），行内摆放会被
       字体 descent 撑高行盒导致图标偏上（同 wc-button .icon 的教训） */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wc-font-size-h3);
    line-height: 1;
  }

  .desc {
    max-width: calc(var(--wc-float-button-size) - 8px);
    overflow: hidden;
    font-size: var(--wc-font-size-xsmall);
    line-height: 1.2;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  :host([shape='square']) .fab {
    border-radius: var(--wc-radius-medium);
  }

  :host([type='primary']) .fab {
    color: var(--wc-color-text-anti);
    background-color: var(--wc-color-primary);
    border-color: var(--wc-color-primary);
  }

  :host([type='primary']) .fab:hover {
    background-color: var(--wc-color-primary-hover);
    border-color: var(--wc-color-primary-hover);
  }

  :host([disabled]) .fab {
    color: var(--wc-color-text-disabled);
    background-color: var(--wc-color-bg-disabled);
    border-color: var(--wc-color-border);
    box-shadow: none;
    cursor: not-allowed;
    pointer-events: none;
  }

  .badge {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    color: var(--wc-color-text-anti);
    font-size: var(--wc-font-size-xsmall);
    line-height: 1;
    white-space: nowrap;
    background-color: var(--wc-color-error);
    border-radius: var(--wc-radius-round);
    transform: translate(50%, -50%);
  }

  :host([dot]) .badge {
    min-width: 6px;
    width: 6px;
    height: 6px;
    padding: 0;
  }

  /* 内建 tooltip 气泡（轻量版：无箭头，fixed 定位于按钮左侧） */
  .tip {
    position: fixed;
    z-index: var(--wc-z-index-tooltip);
    max-width: 200px;
    padding: var(--wc-space-1) var(--wc-space-2);
    color: var(--wc-color-text-anti);
    font-size: var(--wc-font-size-xsmall);
    white-space: nowrap;
    background-color: var(--wc-color-gray-900);
    border-radius: var(--wc-radius-small);
    opacity: 0;
    visibility: hidden;
    transition:
      opacity var(--wc-duration-fast) var(--wc-easing-standard),
      visibility var(--wc-duration-fast);
  }

  .tip[data-open] {
    opacity: 1;
    visibility: visible;
  }

  @media (prefers-reduced-motion: reduce) {
    .fab,
    .tip {
      transition: none;
    }
  }
`;
