import { css } from 'lit';

export const dropdownItemStyles = css`
  :host {
    display: block;
  }

  .item {
    display: flex;
    align-items: center;
    gap: var(--wc-space-2);
    padding: 0 var(--wc-space-3);
    height: 32px;
    font-size: var(--wc-font-size-medium);
    color: var(--wc-color-text);
    cursor: pointer;
    user-select: none;
    transition: background-color var(--wc-duration-fast) var(--wc-easing-standard);
  }

  .text {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :host(:hover:not([disabled]):not([divider])) .item,
  :host([active]:not([disabled]):not([divider])) .item {
    background-color: var(--wc-color-bg-hover);
  }

  :host([danger]:not([disabled])) .item {
    color: var(--wc-color-error);
  }

  :host([disabled]) .item {
    color: var(--wc-color-text-disabled);
    cursor: not-allowed;
  }

  /* 分隔线：不响应 hover / danger */
  :host([divider]) .item {
    display: block;
    height: 1px;
    min-height: 1px;
    padding: 0;
    margin: var(--wc-space-1) 0;
    overflow: hidden;
    background-color: var(--wc-color-border);
    cursor: default;
  }
`;
