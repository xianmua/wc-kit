import { css } from 'lit';

/** 容器（wc-collapse）样式 */
export const collapseStyles = css`
  :host {
    display: block;
    /* component 层令牌：引用 semantic 层，允许按实例覆盖 */
    --wc-collapse-border: var(--wc-color-border);
    --wc-collapse-radius: var(--wc-radius-medium);
    border: 1px solid var(--wc-collapse-border);
    border-radius: var(--wc-collapse-radius);
    background-color: var(--wc-color-bg-container);
    /* 条目底部分隔线会溢出圆角 */
    overflow: hidden;
  }
`;

/** 面板（wc-collapse-item）样式 */
export const collapseItemStyles = css`
  :host {
    display: block;
  }

  .item {
    border-bottom: 1px solid var(--wc-color-border);
  }

  :host(:last-child) .item {
    border-bottom: none;
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--wc-space-2);
    width: 100%;
    padding: var(--wc-space-4);
    font: inherit;
    color: var(--wc-color-text);
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    transition: color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .header:hover {
    color: var(--wc-color-primary);
  }

  .header:disabled {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
  }

  .arrow {
    display: flex;
    flex-shrink: 0;
    transition: transform var(--wc-duration-medium) var(--wc-easing-standard);
  }

  :host([open]) .arrow {
    transform: rotate(180deg);
  }

  .title {
    flex: 1;
    min-width: 0;
  }

  /* 高度动画：grid 0fr/1fr 过渡，无需 JS 测量 */
  .content-wrap {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--wc-duration-medium) var(--wc-easing-standard);
  }

  :host([open]) .content-wrap {
    grid-template-rows: 1fr;
  }

  .content {
    overflow: hidden;
    min-height: 0;
  }

  /* padding 不能放在 .content 上（0fr 时 padding 仍会撑出高度），包一层 */
  .inner {
    padding: 0 var(--wc-space-4) var(--wc-space-4);
    color: var(--wc-color-text-secondary);
  }

  @media (prefers-reduced-motion: reduce) {
    .content-wrap,
    .arrow {
      transition: none;
    }
  }
`;
