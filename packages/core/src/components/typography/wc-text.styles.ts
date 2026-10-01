import { css } from 'lit';

export const typographyStyles = css`
  :host {
    display: inline;
  }

  :host([variant='heading']) {
    display: block;
  }

  .text {
    color: var(--wc-color-text);
    font-size: var(--wc-font-size-medium);
    line-height: var(--wc-font-line-height, 1.6);
  }

  .text slot {
    display: contents;
  }

  /* ---- 标题级别（h4~h6 无对应全局令牌，组件层补齐） ---- */
  .heading {
    font-weight: var(--wc-font-weight-semibold);
    line-height: 1.4;
    color: var(--wc-color-text);
  }

  .level-1 {
    font-size: var(--wc-font-size-h1);
  }

  .level-2 {
    font-size: var(--wc-font-size-h2);
  }

  .level-3 {
    font-size: var(--wc-font-size-h3);
  }

  .level-4 {
    font-size: var(--wc-font-size-large);
  }

  .level-5 {
    font-size: var(--wc-font-size-medium);
  }

  .level-6 {
    font-size: var(--wc-font-size-medium);
    font-weight: var(--wc-font-weight-medium);
  }

  /* ---- 语义色 ---- */
  :host([type='secondary']) .text {
    color: var(--wc-color-text-secondary);
  }

  :host([type='success']) .text {
    color: var(--wc-color-success);
  }

  :host([type='warning']) .text {
    color: var(--wc-color-warning);
  }

  :host([type='danger']) .text {
    color: var(--wc-color-error);
  }

  /* ---- 禁用 ---- */
  :host([disabled]) .text {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
    user-select: none;
  }
`;
